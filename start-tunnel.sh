#!/bin/bash
# 启动 Alpha Arena 隧道（serveo.net）
tmux kill-session -t tunnel 2>/dev/null
tmux new-session -d -s tunnel "ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=60 -R 80:localhost:3000 serveo.net 2>&1"
sleep 12
echo "=== Tunnel URL ==="
tmux capture-pane -t tunnel -p | grep "Forwarding"
echo ""
echo "Check: curl $(tmux capture-pane -t tunnel -p | grep 'Forwarding' | grep -o 'https://[^ ]*' | tr -d '\n')/api/competitions"
