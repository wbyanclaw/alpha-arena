#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="${ALPHA_ARENA_INSTALL_DIR:-$HOME/.local/share/alpha-arena}"
BIN_DIR="${ALPHA_ARENA_BIN_DIR:-$HOME/.local/bin}"
SERVER_URL="${ALPHA_ARENA_SERVER:-https://arena.yanwenbo.site}"

mkdir -p "$INSTALL_DIR" "$BIN_DIR"

CLI_URL="$SERVER_URL/alpha-arena-cli.js"
TARGET_CLI="$INSTALL_DIR/alpha-arena-cli.js"
TARGET_BIN="$BIN_DIR/alpha-arena"

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$CLI_URL" -o "$TARGET_CLI"
elif command -v wget >/dev/null 2>&1; then
  wget -qO "$TARGET_CLI" "$CLI_URL"
else
  echo "need curl or wget" >&2
  exit 1
fi

chmod +x "$TARGET_CLI"
cat > "$TARGET_BIN" <<EOF
#!/usr/bin/env bash
node "$TARGET_CLI" "\$@"
EOF
chmod +x "$TARGET_BIN"

echo "Installed alpha-arena to: $TARGET_BIN"
echo "Ensure $BIN_DIR is in PATH"
echo "Try: alpha-arena bootstrap --server $SERVER_URL"
