
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model Competition
 * 
 */
export type Competition = $Result.DefaultSelection<Prisma.$CompetitionPayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model Position
 * 
 */
export type Position = $Result.DefaultSelection<Prisma.$PositionPayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model Price
 * 
 */
export type Price = $Result.DefaultSelection<Prisma.$PricePayload>
/**
 * Model Lobster
 * 
 */
export type Lobster = $Result.DefaultSelection<Prisma.$LobsterPayload>
/**
 * Model Delivery
 * 
 */
export type Delivery = $Result.DefaultSelection<Prisma.$DeliveryPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model LogEntry
 * 
 */
export type LogEntry = $Result.DefaultSelection<Prisma.$LogEntryPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model DailySettlement
 * 
 */
export type DailySettlement = $Result.DefaultSelection<Prisma.$DailySettlementPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LobsterKey: {
  RED: 'RED',
  BLUE: 'BLUE',
  GOLD: 'GOLD'
};

export type LobsterKey = (typeof LobsterKey)[keyof typeof LobsterKey]


export const DeliverySide: {
  BUY: 'BUY',
  SELL: 'SELL'
};

export type DeliverySide = (typeof DeliverySide)[keyof typeof DeliverySide]


export const TradeSide: {
  BUY: 'BUY',
  SELL: 'SELL'
};

export type TradeSide = (typeof TradeSide)[keyof typeof TradeSide]


export const TradeStatus: {
  PENDING: 'PENDING',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED'
};

export type TradeStatus = (typeof TradeStatus)[keyof typeof TradeStatus]


export const AgentStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BANNED: 'BANNED'
};

export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus]


export const CompetitionStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  FINISHED: 'FINISHED'
};

export type CompetitionStatus = (typeof CompetitionStatus)[keyof typeof CompetitionStatus]

}

export type LobsterKey = $Enums.LobsterKey

export const LobsterKey: typeof $Enums.LobsterKey

export type DeliverySide = $Enums.DeliverySide

export const DeliverySide: typeof $Enums.DeliverySide

export type TradeSide = $Enums.TradeSide

export const TradeSide: typeof $Enums.TradeSide

export type TradeStatus = $Enums.TradeStatus

export const TradeStatus: typeof $Enums.TradeStatus

export type AgentStatus = $Enums.AgentStatus

export const AgentStatus: typeof $Enums.AgentStatus

export type CompetitionStatus = $Enums.CompetitionStatus

export const CompetitionStatus: typeof $Enums.CompetitionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agents
 * const agents = await prisma.agent.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agents
   * const agents = await prisma.agent.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.competition`: Exposes CRUD operations for the **Competition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Competitions
    * const competitions = await prisma.competition.findMany()
    * ```
    */
  get competition(): Prisma.CompetitionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.position`: Exposes CRUD operations for the **Position** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Positions
    * const positions = await prisma.position.findMany()
    * ```
    */
  get position(): Prisma.PositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.price`: Exposes CRUD operations for the **Price** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prices
    * const prices = await prisma.price.findMany()
    * ```
    */
  get price(): Prisma.PriceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lobster`: Exposes CRUD operations for the **Lobster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lobsters
    * const lobsters = await prisma.lobster.findMany()
    * ```
    */
  get lobster(): Prisma.LobsterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.delivery`: Exposes CRUD operations for the **Delivery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deliveries
    * const deliveries = await prisma.delivery.findMany()
    * ```
    */
  get delivery(): Prisma.DeliveryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.logEntry`: Exposes CRUD operations for the **LogEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogEntries
    * const logEntries = await prisma.logEntry.findMany()
    * ```
    */
  get logEntry(): Prisma.LogEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailySettlement`: Exposes CRUD operations for the **DailySettlement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailySettlements
    * const dailySettlements = await prisma.dailySettlement.findMany()
    * ```
    */
  get dailySettlement(): Prisma.DailySettlementDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Agent: 'Agent',
    Competition: 'Competition',
    Portfolio: 'Portfolio',
    Position: 'Position',
    Trade: 'Trade',
    Price: 'Price',
    Lobster: 'Lobster',
    Delivery: 'Delivery',
    Comment: 'Comment',
    LogEntry: 'LogEntry',
    Order: 'Order',
    DailySettlement: 'DailySettlement'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agent" | "competition" | "portfolio" | "position" | "trade" | "price" | "lobster" | "delivery" | "comment" | "logEntry" | "order" | "dailySettlement"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      Competition: {
        payload: Prisma.$CompetitionPayload<ExtArgs>
        fields: Prisma.CompetitionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompetitionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompetitionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>
          }
          findFirst: {
            args: Prisma.CompetitionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompetitionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>
          }
          findMany: {
            args: Prisma.CompetitionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>[]
          }
          create: {
            args: Prisma.CompetitionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>
          }
          createMany: {
            args: Prisma.CompetitionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompetitionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>[]
          }
          delete: {
            args: Prisma.CompetitionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>
          }
          update: {
            args: Prisma.CompetitionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>
          }
          deleteMany: {
            args: Prisma.CompetitionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompetitionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompetitionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>[]
          }
          upsert: {
            args: Prisma.CompetitionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitionPayload>
          }
          aggregate: {
            args: Prisma.CompetitionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompetition>
          }
          groupBy: {
            args: Prisma.CompetitionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompetitionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompetitionCountArgs<ExtArgs>
            result: $Utils.Optional<CompetitionCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortfolioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
      Position: {
        payload: Prisma.$PositionPayload<ExtArgs>
        fields: Prisma.PositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findFirst: {
            args: Prisma.PositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          findMany: {
            args: Prisma.PositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          create: {
            args: Prisma.PositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          createMany: {
            args: Prisma.PositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          delete: {
            args: Prisma.PositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          update: {
            args: Prisma.PositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          deleteMany: {
            args: Prisma.PositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>[]
          }
          upsert: {
            args: Prisma.PositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionPayload>
          }
          aggregate: {
            args: Prisma.PositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosition>
          }
          groupBy: {
            args: Prisma.PositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionCountArgs<ExtArgs>
            result: $Utils.Optional<PositionCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      Price: {
        payload: Prisma.$PricePayload<ExtArgs>
        fields: Prisma.PriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          findFirst: {
            args: Prisma.PriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          findMany: {
            args: Prisma.PriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          create: {
            args: Prisma.PriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          createMany: {
            args: Prisma.PriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          delete: {
            args: Prisma.PriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          update: {
            args: Prisma.PriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          deleteMany: {
            args: Prisma.PriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          upsert: {
            args: Prisma.PriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          aggregate: {
            args: Prisma.PriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrice>
          }
          groupBy: {
            args: Prisma.PriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceCountArgs<ExtArgs>
            result: $Utils.Optional<PriceCountAggregateOutputType> | number
          }
        }
      }
      Lobster: {
        payload: Prisma.$LobsterPayload<ExtArgs>
        fields: Prisma.LobsterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LobsterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LobsterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>
          }
          findFirst: {
            args: Prisma.LobsterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LobsterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>
          }
          findMany: {
            args: Prisma.LobsterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>[]
          }
          create: {
            args: Prisma.LobsterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>
          }
          createMany: {
            args: Prisma.LobsterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LobsterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>[]
          }
          delete: {
            args: Prisma.LobsterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>
          }
          update: {
            args: Prisma.LobsterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>
          }
          deleteMany: {
            args: Prisma.LobsterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LobsterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LobsterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>[]
          }
          upsert: {
            args: Prisma.LobsterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobsterPayload>
          }
          aggregate: {
            args: Prisma.LobsterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLobster>
          }
          groupBy: {
            args: Prisma.LobsterGroupByArgs<ExtArgs>
            result: $Utils.Optional<LobsterGroupByOutputType>[]
          }
          count: {
            args: Prisma.LobsterCountArgs<ExtArgs>
            result: $Utils.Optional<LobsterCountAggregateOutputType> | number
          }
        }
      }
      Delivery: {
        payload: Prisma.$DeliveryPayload<ExtArgs>
        fields: Prisma.DeliveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findFirst: {
            args: Prisma.DeliveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findMany: {
            args: Prisma.DeliveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          create: {
            args: Prisma.DeliveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          createMany: {
            args: Prisma.DeliveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          delete: {
            args: Prisma.DeliveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          update: {
            args: Prisma.DeliveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          aggregate: {
            args: Prisma.DeliveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelivery>
          }
          groupBy: {
            args: Prisma.DeliveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      LogEntry: {
        payload: Prisma.$LogEntryPayload<ExtArgs>
        fields: Prisma.LogEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          findFirst: {
            args: Prisma.LogEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          findMany: {
            args: Prisma.LogEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>[]
          }
          create: {
            args: Prisma.LogEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          createMany: {
            args: Prisma.LogEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LogEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>[]
          }
          delete: {
            args: Prisma.LogEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          update: {
            args: Prisma.LogEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          deleteMany: {
            args: Prisma.LogEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LogEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>[]
          }
          upsert: {
            args: Prisma.LogEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          aggregate: {
            args: Prisma.LogEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogEntry>
          }
          groupBy: {
            args: Prisma.LogEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogEntryCountArgs<ExtArgs>
            result: $Utils.Optional<LogEntryCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      DailySettlement: {
        payload: Prisma.$DailySettlementPayload<ExtArgs>
        fields: Prisma.DailySettlementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailySettlementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailySettlementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>
          }
          findFirst: {
            args: Prisma.DailySettlementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailySettlementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>
          }
          findMany: {
            args: Prisma.DailySettlementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>[]
          }
          create: {
            args: Prisma.DailySettlementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>
          }
          createMany: {
            args: Prisma.DailySettlementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailySettlementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>[]
          }
          delete: {
            args: Prisma.DailySettlementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>
          }
          update: {
            args: Prisma.DailySettlementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>
          }
          deleteMany: {
            args: Prisma.DailySettlementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailySettlementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailySettlementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>[]
          }
          upsert: {
            args: Prisma.DailySettlementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailySettlementPayload>
          }
          aggregate: {
            args: Prisma.DailySettlementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailySettlement>
          }
          groupBy: {
            args: Prisma.DailySettlementGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailySettlementGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailySettlementCountArgs<ExtArgs>
            result: $Utils.Optional<DailySettlementCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agent?: AgentOmit
    competition?: CompetitionOmit
    portfolio?: PortfolioOmit
    position?: PositionOmit
    trade?: TradeOmit
    price?: PriceOmit
    lobster?: LobsterOmit
    delivery?: DeliveryOmit
    comment?: CommentOmit
    logEntry?: LogEntryOmit
    order?: OrderOmit
    dailySettlement?: DailySettlementOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    trades: number
    portfolios: number
    orders: number
    logs: number
    comments: number
    deliveries: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | AgentCountOutputTypeCountTradesArgs
    portfolios?: boolean | AgentCountOutputTypeCountPortfoliosArgs
    orders?: boolean | AgentCountOutputTypeCountOrdersArgs
    logs?: boolean | AgentCountOutputTypeCountLogsArgs
    comments?: boolean | AgentCountOutputTypeCountCommentsArgs
    deliveries?: boolean | AgentCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogEntryWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
  }


  /**
   * Count Type CompetitionCountOutputType
   */

  export type CompetitionCountOutputType = {
    portfolios: number
    orders: number
  }

  export type CompetitionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolios?: boolean | CompetitionCountOutputTypeCountPortfoliosArgs
    orders?: boolean | CompetitionCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * CompetitionCountOutputType without action
   */
  export type CompetitionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitionCountOutputType
     */
    select?: CompetitionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompetitionCountOutputType without action
   */
  export type CompetitionCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }

  /**
   * CompetitionCountOutputType without action
   */
  export type CompetitionCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type PortfolioCountOutputType
   */

  export type PortfolioCountOutputType = {
    positions: number
    orders: number
    settlements: number
  }

  export type PortfolioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | PortfolioCountOutputTypeCountPositionsArgs
    orders?: boolean | PortfolioCountOutputTypeCountOrdersArgs
    settlements?: boolean | PortfolioCountOutputTypeCountSettlementsArgs
  }

  // Custom InputTypes
  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioCountOutputType
     */
    select?: PortfolioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountSettlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailySettlementWhereInput
  }


  /**
   * Count Type LobsterCountOutputType
   */

  export type LobsterCountOutputType = {
    deliveries: number
    comments: number
    logs: number
  }

  export type LobsterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | LobsterCountOutputTypeCountDeliveriesArgs
    comments?: boolean | LobsterCountOutputTypeCountCommentsArgs
    logs?: boolean | LobsterCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * LobsterCountOutputType without action
   */
  export type LobsterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LobsterCountOutputType
     */
    select?: LobsterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LobsterCountOutputType without action
   */
  export type LobsterCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
  }

  /**
   * LobsterCountOutputType without action
   */
  export type LobsterCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * LobsterCountOutputType without action
   */
  export type LobsterCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogEntryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    name: string | null
    apiKey: string | null
    secretHash: string | null
    status: $Enums.AgentStatus | null
    avatar: string | null
    description: string | null
    model: string | null
    market: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    apiKey: string | null
    secretHash: string | null
    status: $Enums.AgentStatus | null
    avatar: string | null
    description: string | null
    model: string | null
    market: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    name: number
    apiKey: number
    secretHash: number
    status: number
    avatar: number
    description: number
    model: number
    market: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentMinAggregateInputType = {
    id?: true
    name?: true
    apiKey?: true
    secretHash?: true
    status?: true
    avatar?: true
    description?: true
    model?: true
    market?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    name?: true
    apiKey?: true
    secretHash?: true
    status?: true
    avatar?: true
    description?: true
    model?: true
    market?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    name?: true
    apiKey?: true
    secretHash?: true
    status?: true
    avatar?: true
    description?: true
    model?: true
    market?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    name: string
    apiKey: string
    secretHash: string
    status: $Enums.AgentStatus
    avatar: string | null
    description: string | null
    model: string | null
    market: string
    createdAt: Date
    updatedAt: Date
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    apiKey?: boolean
    secretHash?: boolean
    status?: boolean
    avatar?: boolean
    description?: boolean
    model?: boolean
    market?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trades?: boolean | Agent$tradesArgs<ExtArgs>
    portfolios?: boolean | Agent$portfoliosArgs<ExtArgs>
    orders?: boolean | Agent$ordersArgs<ExtArgs>
    logs?: boolean | Agent$logsArgs<ExtArgs>
    comments?: boolean | Agent$commentsArgs<ExtArgs>
    deliveries?: boolean | Agent$deliveriesArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    apiKey?: boolean
    secretHash?: boolean
    status?: boolean
    avatar?: boolean
    description?: boolean
    model?: boolean
    market?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    apiKey?: boolean
    secretHash?: boolean
    status?: boolean
    avatar?: boolean
    description?: boolean
    model?: boolean
    market?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    name?: boolean
    apiKey?: boolean
    secretHash?: boolean
    status?: boolean
    avatar?: boolean
    description?: boolean
    model?: boolean
    market?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "apiKey" | "secretHash" | "status" | "avatar" | "description" | "model" | "market" | "createdAt" | "updatedAt", ExtArgs["result"]["agent"]>
  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | Agent$tradesArgs<ExtArgs>
    portfolios?: boolean | Agent$portfoliosArgs<ExtArgs>
    orders?: boolean | Agent$ordersArgs<ExtArgs>
    logs?: boolean | Agent$logsArgs<ExtArgs>
    comments?: boolean | Agent$commentsArgs<ExtArgs>
    deliveries?: boolean | Agent$deliveriesArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      trades: Prisma.$TradePayload<ExtArgs>[]
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      logs: Prisma.$LogEntryPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      deliveries: Prisma.$DeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      apiKey: string
      secretHash: string
      status: $Enums.AgentStatus
      avatar: string | null
      description: string | null
      model: string | null
      market: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trades<T extends Agent$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Agent$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    portfolios<T extends Agent$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, Agent$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Agent$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Agent$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logs<T extends Agent$logsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Agent$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deliveries<T extends Agent$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Agent$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly apiKey: FieldRef<"Agent", 'String'>
    readonly secretHash: FieldRef<"Agent", 'String'>
    readonly status: FieldRef<"Agent", 'AgentStatus'>
    readonly avatar: FieldRef<"Agent", 'String'>
    readonly description: FieldRef<"Agent", 'String'>
    readonly model: FieldRef<"Agent", 'String'>
    readonly market: FieldRef<"Agent", 'String'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent.trades
   */
  export type Agent$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Agent.portfolios
   */
  export type Agent$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Agent.orders
   */
  export type Agent$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Agent.logs
   */
  export type Agent$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    where?: LogEntryWhereInput
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    cursor?: LogEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * Agent.comments
   */
  export type Agent$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Agent.deliveries
   */
  export type Agent$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    cursor?: DeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model Competition
   */

  export type AggregateCompetition = {
    _count: CompetitionCountAggregateOutputType | null
    _avg: CompetitionAvgAggregateOutputType | null
    _sum: CompetitionSumAggregateOutputType | null
    _min: CompetitionMinAggregateOutputType | null
    _max: CompetitionMaxAggregateOutputType | null
  }

  export type CompetitionAvgAggregateOutputType = {
    initialCash: number | null
  }

  export type CompetitionSumAggregateOutputType = {
    initialCash: number | null
  }

  export type CompetitionMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: $Enums.CompetitionStatus | null
    startAt: Date | null
    endAt: Date | null
    initialCash: number | null
    market: string | null
    testMode: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompetitionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: $Enums.CompetitionStatus | null
    startAt: Date | null
    endAt: Date | null
    initialCash: number | null
    market: string | null
    testMode: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompetitionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    startAt: number
    endAt: number
    initialCash: number
    market: number
    testMode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompetitionAvgAggregateInputType = {
    initialCash?: true
  }

  export type CompetitionSumAggregateInputType = {
    initialCash?: true
  }

  export type CompetitionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    startAt?: true
    endAt?: true
    initialCash?: true
    market?: true
    testMode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompetitionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    startAt?: true
    endAt?: true
    initialCash?: true
    market?: true
    testMode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompetitionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    startAt?: true
    endAt?: true
    initialCash?: true
    market?: true
    testMode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompetitionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Competition to aggregate.
     */
    where?: CompetitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competitions to fetch.
     */
    orderBy?: CompetitionOrderByWithRelationInput | CompetitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompetitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Competitions
    **/
    _count?: true | CompetitionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompetitionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompetitionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompetitionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompetitionMaxAggregateInputType
  }

  export type GetCompetitionAggregateType<T extends CompetitionAggregateArgs> = {
        [P in keyof T & keyof AggregateCompetition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompetition[P]>
      : GetScalarType<T[P], AggregateCompetition[P]>
  }




  export type CompetitionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompetitionWhereInput
    orderBy?: CompetitionOrderByWithAggregationInput | CompetitionOrderByWithAggregationInput[]
    by: CompetitionScalarFieldEnum[] | CompetitionScalarFieldEnum
    having?: CompetitionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompetitionCountAggregateInputType | true
    _avg?: CompetitionAvgAggregateInputType
    _sum?: CompetitionSumAggregateInputType
    _min?: CompetitionMinAggregateInputType
    _max?: CompetitionMaxAggregateInputType
  }

  export type CompetitionGroupByOutputType = {
    id: string
    name: string
    description: string | null
    status: $Enums.CompetitionStatus
    startAt: Date | null
    endAt: Date | null
    initialCash: number
    market: string
    testMode: boolean
    createdAt: Date
    updatedAt: Date
    _count: CompetitionCountAggregateOutputType | null
    _avg: CompetitionAvgAggregateOutputType | null
    _sum: CompetitionSumAggregateOutputType | null
    _min: CompetitionMinAggregateOutputType | null
    _max: CompetitionMaxAggregateOutputType | null
  }

  type GetCompetitionGroupByPayload<T extends CompetitionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompetitionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompetitionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompetitionGroupByOutputType[P]>
            : GetScalarType<T[P], CompetitionGroupByOutputType[P]>
        }
      >
    >


  export type CompetitionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    startAt?: boolean
    endAt?: boolean
    initialCash?: boolean
    market?: boolean
    testMode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolios?: boolean | Competition$portfoliosArgs<ExtArgs>
    orders?: boolean | Competition$ordersArgs<ExtArgs>
    _count?: boolean | CompetitionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["competition"]>

  export type CompetitionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    startAt?: boolean
    endAt?: boolean
    initialCash?: boolean
    market?: boolean
    testMode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["competition"]>

  export type CompetitionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    startAt?: boolean
    endAt?: boolean
    initialCash?: boolean
    market?: boolean
    testMode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["competition"]>

  export type CompetitionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    startAt?: boolean
    endAt?: boolean
    initialCash?: boolean
    market?: boolean
    testMode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompetitionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "status" | "startAt" | "endAt" | "initialCash" | "market" | "testMode" | "createdAt" | "updatedAt", ExtArgs["result"]["competition"]>
  export type CompetitionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolios?: boolean | Competition$portfoliosArgs<ExtArgs>
    orders?: boolean | Competition$ordersArgs<ExtArgs>
    _count?: boolean | CompetitionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompetitionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompetitionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompetitionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Competition"
    objects: {
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      status: $Enums.CompetitionStatus
      startAt: Date | null
      endAt: Date | null
      initialCash: number
      market: string
      testMode: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["competition"]>
    composites: {}
  }

  type CompetitionGetPayload<S extends boolean | null | undefined | CompetitionDefaultArgs> = $Result.GetResult<Prisma.$CompetitionPayload, S>

  type CompetitionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompetitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompetitionCountAggregateInputType | true
    }

  export interface CompetitionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Competition'], meta: { name: 'Competition' } }
    /**
     * Find zero or one Competition that matches the filter.
     * @param {CompetitionFindUniqueArgs} args - Arguments to find a Competition
     * @example
     * // Get one Competition
     * const competition = await prisma.competition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompetitionFindUniqueArgs>(args: SelectSubset<T, CompetitionFindUniqueArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Competition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompetitionFindUniqueOrThrowArgs} args - Arguments to find a Competition
     * @example
     * // Get one Competition
     * const competition = await prisma.competition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompetitionFindUniqueOrThrowArgs>(args: SelectSubset<T, CompetitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Competition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitionFindFirstArgs} args - Arguments to find a Competition
     * @example
     * // Get one Competition
     * const competition = await prisma.competition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompetitionFindFirstArgs>(args?: SelectSubset<T, CompetitionFindFirstArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Competition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitionFindFirstOrThrowArgs} args - Arguments to find a Competition
     * @example
     * // Get one Competition
     * const competition = await prisma.competition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompetitionFindFirstOrThrowArgs>(args?: SelectSubset<T, CompetitionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Competitions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Competitions
     * const competitions = await prisma.competition.findMany()
     * 
     * // Get first 10 Competitions
     * const competitions = await prisma.competition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const competitionWithIdOnly = await prisma.competition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompetitionFindManyArgs>(args?: SelectSubset<T, CompetitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Competition.
     * @param {CompetitionCreateArgs} args - Arguments to create a Competition.
     * @example
     * // Create one Competition
     * const Competition = await prisma.competition.create({
     *   data: {
     *     // ... data to create a Competition
     *   }
     * })
     * 
     */
    create<T extends CompetitionCreateArgs>(args: SelectSubset<T, CompetitionCreateArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Competitions.
     * @param {CompetitionCreateManyArgs} args - Arguments to create many Competitions.
     * @example
     * // Create many Competitions
     * const competition = await prisma.competition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompetitionCreateManyArgs>(args?: SelectSubset<T, CompetitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Competitions and returns the data saved in the database.
     * @param {CompetitionCreateManyAndReturnArgs} args - Arguments to create many Competitions.
     * @example
     * // Create many Competitions
     * const competition = await prisma.competition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Competitions and only return the `id`
     * const competitionWithIdOnly = await prisma.competition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompetitionCreateManyAndReturnArgs>(args?: SelectSubset<T, CompetitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Competition.
     * @param {CompetitionDeleteArgs} args - Arguments to delete one Competition.
     * @example
     * // Delete one Competition
     * const Competition = await prisma.competition.delete({
     *   where: {
     *     // ... filter to delete one Competition
     *   }
     * })
     * 
     */
    delete<T extends CompetitionDeleteArgs>(args: SelectSubset<T, CompetitionDeleteArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Competition.
     * @param {CompetitionUpdateArgs} args - Arguments to update one Competition.
     * @example
     * // Update one Competition
     * const competition = await prisma.competition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompetitionUpdateArgs>(args: SelectSubset<T, CompetitionUpdateArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Competitions.
     * @param {CompetitionDeleteManyArgs} args - Arguments to filter Competitions to delete.
     * @example
     * // Delete a few Competitions
     * const { count } = await prisma.competition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompetitionDeleteManyArgs>(args?: SelectSubset<T, CompetitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Competitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Competitions
     * const competition = await prisma.competition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompetitionUpdateManyArgs>(args: SelectSubset<T, CompetitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Competitions and returns the data updated in the database.
     * @param {CompetitionUpdateManyAndReturnArgs} args - Arguments to update many Competitions.
     * @example
     * // Update many Competitions
     * const competition = await prisma.competition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Competitions and only return the `id`
     * const competitionWithIdOnly = await prisma.competition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompetitionUpdateManyAndReturnArgs>(args: SelectSubset<T, CompetitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Competition.
     * @param {CompetitionUpsertArgs} args - Arguments to update or create a Competition.
     * @example
     * // Update or create a Competition
     * const competition = await prisma.competition.upsert({
     *   create: {
     *     // ... data to create a Competition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Competition we want to update
     *   }
     * })
     */
    upsert<T extends CompetitionUpsertArgs>(args: SelectSubset<T, CompetitionUpsertArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Competitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitionCountArgs} args - Arguments to filter Competitions to count.
     * @example
     * // Count the number of Competitions
     * const count = await prisma.competition.count({
     *   where: {
     *     // ... the filter for the Competitions we want to count
     *   }
     * })
    **/
    count<T extends CompetitionCountArgs>(
      args?: Subset<T, CompetitionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompetitionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Competition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompetitionAggregateArgs>(args: Subset<T, CompetitionAggregateArgs>): Prisma.PrismaPromise<GetCompetitionAggregateType<T>>

    /**
     * Group by Competition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompetitionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompetitionGroupByArgs['orderBy'] }
        : { orderBy?: CompetitionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompetitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompetitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Competition model
   */
  readonly fields: CompetitionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Competition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompetitionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolios<T extends Competition$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, Competition$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Competition$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Competition$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Competition model
   */
  interface CompetitionFieldRefs {
    readonly id: FieldRef<"Competition", 'String'>
    readonly name: FieldRef<"Competition", 'String'>
    readonly description: FieldRef<"Competition", 'String'>
    readonly status: FieldRef<"Competition", 'CompetitionStatus'>
    readonly startAt: FieldRef<"Competition", 'DateTime'>
    readonly endAt: FieldRef<"Competition", 'DateTime'>
    readonly initialCash: FieldRef<"Competition", 'Float'>
    readonly market: FieldRef<"Competition", 'String'>
    readonly testMode: FieldRef<"Competition", 'Boolean'>
    readonly createdAt: FieldRef<"Competition", 'DateTime'>
    readonly updatedAt: FieldRef<"Competition", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Competition findUnique
   */
  export type CompetitionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * Filter, which Competition to fetch.
     */
    where: CompetitionWhereUniqueInput
  }

  /**
   * Competition findUniqueOrThrow
   */
  export type CompetitionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * Filter, which Competition to fetch.
     */
    where: CompetitionWhereUniqueInput
  }

  /**
   * Competition findFirst
   */
  export type CompetitionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * Filter, which Competition to fetch.
     */
    where?: CompetitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competitions to fetch.
     */
    orderBy?: CompetitionOrderByWithRelationInput | CompetitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Competitions.
     */
    cursor?: CompetitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Competitions.
     */
    distinct?: CompetitionScalarFieldEnum | CompetitionScalarFieldEnum[]
  }

  /**
   * Competition findFirstOrThrow
   */
  export type CompetitionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * Filter, which Competition to fetch.
     */
    where?: CompetitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competitions to fetch.
     */
    orderBy?: CompetitionOrderByWithRelationInput | CompetitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Competitions.
     */
    cursor?: CompetitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Competitions.
     */
    distinct?: CompetitionScalarFieldEnum | CompetitionScalarFieldEnum[]
  }

  /**
   * Competition findMany
   */
  export type CompetitionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * Filter, which Competitions to fetch.
     */
    where?: CompetitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competitions to fetch.
     */
    orderBy?: CompetitionOrderByWithRelationInput | CompetitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Competitions.
     */
    cursor?: CompetitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competitions.
     */
    skip?: number
    distinct?: CompetitionScalarFieldEnum | CompetitionScalarFieldEnum[]
  }

  /**
   * Competition create
   */
  export type CompetitionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * The data needed to create a Competition.
     */
    data: XOR<CompetitionCreateInput, CompetitionUncheckedCreateInput>
  }

  /**
   * Competition createMany
   */
  export type CompetitionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Competitions.
     */
    data: CompetitionCreateManyInput | CompetitionCreateManyInput[]
  }

  /**
   * Competition createManyAndReturn
   */
  export type CompetitionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * The data used to create many Competitions.
     */
    data: CompetitionCreateManyInput | CompetitionCreateManyInput[]
  }

  /**
   * Competition update
   */
  export type CompetitionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * The data needed to update a Competition.
     */
    data: XOR<CompetitionUpdateInput, CompetitionUncheckedUpdateInput>
    /**
     * Choose, which Competition to update.
     */
    where: CompetitionWhereUniqueInput
  }

  /**
   * Competition updateMany
   */
  export type CompetitionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Competitions.
     */
    data: XOR<CompetitionUpdateManyMutationInput, CompetitionUncheckedUpdateManyInput>
    /**
     * Filter which Competitions to update
     */
    where?: CompetitionWhereInput
    /**
     * Limit how many Competitions to update.
     */
    limit?: number
  }

  /**
   * Competition updateManyAndReturn
   */
  export type CompetitionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * The data used to update Competitions.
     */
    data: XOR<CompetitionUpdateManyMutationInput, CompetitionUncheckedUpdateManyInput>
    /**
     * Filter which Competitions to update
     */
    where?: CompetitionWhereInput
    /**
     * Limit how many Competitions to update.
     */
    limit?: number
  }

  /**
   * Competition upsert
   */
  export type CompetitionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * The filter to search for the Competition to update in case it exists.
     */
    where: CompetitionWhereUniqueInput
    /**
     * In case the Competition found by the `where` argument doesn't exist, create a new Competition with this data.
     */
    create: XOR<CompetitionCreateInput, CompetitionUncheckedCreateInput>
    /**
     * In case the Competition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompetitionUpdateInput, CompetitionUncheckedUpdateInput>
  }

  /**
   * Competition delete
   */
  export type CompetitionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
    /**
     * Filter which Competition to delete.
     */
    where: CompetitionWhereUniqueInput
  }

  /**
   * Competition deleteMany
   */
  export type CompetitionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Competitions to delete
     */
    where?: CompetitionWhereInput
    /**
     * Limit how many Competitions to delete.
     */
    limit?: number
  }

  /**
   * Competition.portfolios
   */
  export type Competition$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Competition.orders
   */
  export type Competition$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Competition without action
   */
  export type CompetitionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competition
     */
    select?: CompetitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competition
     */
    omit?: CompetitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitionInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _avg: PortfolioAvgAggregateOutputType | null
    _sum: PortfolioSumAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioAvgAggregateOutputType = {
    cash: number | null
    totalValue: number | null
  }

  export type PortfolioSumAggregateOutputType = {
    cash: number | null
    totalValue: number | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    competitionId: string | null
    cash: number | null
    totalValue: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    competitionId: string | null
    cash: number | null
    totalValue: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    agentId: number
    competitionId: number
    cash: number
    totalValue: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortfolioAvgAggregateInputType = {
    cash?: true
    totalValue?: true
  }

  export type PortfolioSumAggregateInputType = {
    cash?: true
    totalValue?: true
  }

  export type PortfolioMinAggregateInputType = {
    id?: true
    agentId?: true
    competitionId?: true
    cash?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    agentId?: true
    competitionId?: true
    cash?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    agentId?: true
    competitionId?: true
    cash?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _avg?: PortfolioAvgAggregateInputType
    _sum?: PortfolioSumAggregateInputType
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    agentId: string
    competitionId: string
    cash: number
    totalValue: number
    createdAt: Date
    updatedAt: Date
    _count: PortfolioCountAggregateOutputType | null
    _avg: PortfolioAvgAggregateOutputType | null
    _sum: PortfolioSumAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    cash?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    positions?: boolean | Portfolio$positionsArgs<ExtArgs>
    orders?: boolean | Portfolio$ordersArgs<ExtArgs>
    settlements?: boolean | Portfolio$settlementsArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    cash?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    cash?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectScalar = {
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    cash?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortfolioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "competitionId" | "cash" | "totalValue" | "createdAt" | "updatedAt", ExtArgs["result"]["portfolio"]>
  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    positions?: boolean | Portfolio$positionsArgs<ExtArgs>
    orders?: boolean | Portfolio$ordersArgs<ExtArgs>
    settlements?: boolean | Portfolio$settlementsArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      competition: Prisma.$CompetitionPayload<ExtArgs>
      positions: Prisma.$PositionPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      settlements: Prisma.$DailySettlementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      competitionId: string
      cash: number
      totalValue: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portfolios and returns the data saved in the database.
     * @param {PortfolioCreateManyAndReturnArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios and returns the data updated in the database.
     * @param {PortfolioUpdateManyAndReturnArgs} args - Arguments to update many Portfolios.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortfolioUpdateManyAndReturnArgs>(args: SelectSubset<T, PortfolioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    competition<T extends CompetitionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompetitionDefaultArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    positions<T extends Portfolio$positionsArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Portfolio$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settlements<T extends Portfolio$settlementsArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$settlementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portfolio model
   */
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly agentId: FieldRef<"Portfolio", 'String'>
    readonly competitionId: FieldRef<"Portfolio", 'String'>
    readonly cash: FieldRef<"Portfolio", 'Float'>
    readonly totalValue: FieldRef<"Portfolio", 'Float'>
    readonly createdAt: FieldRef<"Portfolio", 'DateTime'>
    readonly updatedAt: FieldRef<"Portfolio", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
  }

  /**
   * Portfolio createManyAndReturn
   */
  export type PortfolioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
  }

  /**
   * Portfolio updateManyAndReturn
   */
  export type PortfolioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to delete.
     */
    limit?: number
  }

  /**
   * Portfolio.positions
   */
  export type Portfolio$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    cursor?: PositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Portfolio.orders
   */
  export type Portfolio$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Portfolio.settlements
   */
  export type Portfolio$settlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    where?: DailySettlementWhereInput
    orderBy?: DailySettlementOrderByWithRelationInput | DailySettlementOrderByWithRelationInput[]
    cursor?: DailySettlementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailySettlementScalarFieldEnum | DailySettlementScalarFieldEnum[]
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Model Position
   */

  export type AggregatePosition = {
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  export type PositionAvgAggregateOutputType = {
    quantity: number | null
    avgCost: number | null
    currentPrice: number | null
  }

  export type PositionSumAggregateOutputType = {
    quantity: number | null
    avgCost: number | null
    currentPrice: number | null
  }

  export type PositionMinAggregateOutputType = {
    id: string | null
    portfolioId: string | null
    symbol: string | null
    quantity: number | null
    avgCost: number | null
    currentPrice: number | null
    boughtAt: Date | null
    updatedAt: Date | null
  }

  export type PositionMaxAggregateOutputType = {
    id: string | null
    portfolioId: string | null
    symbol: string | null
    quantity: number | null
    avgCost: number | null
    currentPrice: number | null
    boughtAt: Date | null
    updatedAt: Date | null
  }

  export type PositionCountAggregateOutputType = {
    id: number
    portfolioId: number
    symbol: number
    quantity: number
    avgCost: number
    currentPrice: number
    boughtAt: number
    updatedAt: number
    _all: number
  }


  export type PositionAvgAggregateInputType = {
    quantity?: true
    avgCost?: true
    currentPrice?: true
  }

  export type PositionSumAggregateInputType = {
    quantity?: true
    avgCost?: true
    currentPrice?: true
  }

  export type PositionMinAggregateInputType = {
    id?: true
    portfolioId?: true
    symbol?: true
    quantity?: true
    avgCost?: true
    currentPrice?: true
    boughtAt?: true
    updatedAt?: true
  }

  export type PositionMaxAggregateInputType = {
    id?: true
    portfolioId?: true
    symbol?: true
    quantity?: true
    avgCost?: true
    currentPrice?: true
    boughtAt?: true
    updatedAt?: true
  }

  export type PositionCountAggregateInputType = {
    id?: true
    portfolioId?: true
    symbol?: true
    quantity?: true
    avgCost?: true
    currentPrice?: true
    boughtAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Position to aggregate.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Positions
    **/
    _count?: true | PositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionMaxAggregateInputType
  }

  export type GetPositionAggregateType<T extends PositionAggregateArgs> = {
        [P in keyof T & keyof AggregatePosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosition[P]>
      : GetScalarType<T[P], AggregatePosition[P]>
  }




  export type PositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionWhereInput
    orderBy?: PositionOrderByWithAggregationInput | PositionOrderByWithAggregationInput[]
    by: PositionScalarFieldEnum[] | PositionScalarFieldEnum
    having?: PositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionCountAggregateInputType | true
    _avg?: PositionAvgAggregateInputType
    _sum?: PositionSumAggregateInputType
    _min?: PositionMinAggregateInputType
    _max?: PositionMaxAggregateInputType
  }

  export type PositionGroupByOutputType = {
    id: string
    portfolioId: string
    symbol: string
    quantity: number
    avgCost: number
    currentPrice: number | null
    boughtAt: Date
    updatedAt: Date
    _count: PositionCountAggregateOutputType | null
    _avg: PositionAvgAggregateOutputType | null
    _sum: PositionSumAggregateOutputType | null
    _min: PositionMinAggregateOutputType | null
    _max: PositionMaxAggregateOutputType | null
  }

  type GetPositionGroupByPayload<T extends PositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionGroupByOutputType[P]>
            : GetScalarType<T[P], PositionGroupByOutputType[P]>
        }
      >
    >


  export type PositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    symbol?: boolean
    quantity?: boolean
    avgCost?: boolean
    currentPrice?: boolean
    boughtAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    symbol?: boolean
    quantity?: boolean
    avgCost?: boolean
    currentPrice?: boolean
    boughtAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    symbol?: boolean
    quantity?: boolean
    avgCost?: boolean
    currentPrice?: boolean
    boughtAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["position"]>

  export type PositionSelectScalar = {
    id?: boolean
    portfolioId?: boolean
    symbol?: boolean
    quantity?: boolean
    avgCost?: boolean
    currentPrice?: boolean
    boughtAt?: boolean
    updatedAt?: boolean
  }

  export type PositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "portfolioId" | "symbol" | "quantity" | "avgCost" | "currentPrice" | "boughtAt" | "updatedAt", ExtArgs["result"]["position"]>
  export type PositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type PositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type PositionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }

  export type $PositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Position"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      portfolioId: string
      symbol: string
      quantity: number
      avgCost: number
      currentPrice: number | null
      boughtAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["position"]>
    composites: {}
  }

  type PositionGetPayload<S extends boolean | null | undefined | PositionDefaultArgs> = $Result.GetResult<Prisma.$PositionPayload, S>

  type PositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionCountAggregateInputType | true
    }

  export interface PositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Position'], meta: { name: 'Position' } }
    /**
     * Find zero or one Position that matches the filter.
     * @param {PositionFindUniqueArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionFindUniqueArgs>(args: SelectSubset<T, PositionFindUniqueArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Position that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionFindUniqueOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionFindFirstArgs>(args?: SelectSubset<T, PositionFindFirstArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Position that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindFirstOrThrowArgs} args - Arguments to find a Position
     * @example
     * // Get one Position
     * const position = await prisma.position.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Positions
     * const positions = await prisma.position.findMany()
     * 
     * // Get first 10 Positions
     * const positions = await prisma.position.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionWithIdOnly = await prisma.position.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionFindManyArgs>(args?: SelectSubset<T, PositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Position.
     * @param {PositionCreateArgs} args - Arguments to create a Position.
     * @example
     * // Create one Position
     * const Position = await prisma.position.create({
     *   data: {
     *     // ... data to create a Position
     *   }
     * })
     * 
     */
    create<T extends PositionCreateArgs>(args: SelectSubset<T, PositionCreateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Positions.
     * @param {PositionCreateManyArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionCreateManyArgs>(args?: SelectSubset<T, PositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Positions and returns the data saved in the database.
     * @param {PositionCreateManyAndReturnArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const position = await prisma.position.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Position.
     * @param {PositionDeleteArgs} args - Arguments to delete one Position.
     * @example
     * // Delete one Position
     * const Position = await prisma.position.delete({
     *   where: {
     *     // ... filter to delete one Position
     *   }
     * })
     * 
     */
    delete<T extends PositionDeleteArgs>(args: SelectSubset<T, PositionDeleteArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Position.
     * @param {PositionUpdateArgs} args - Arguments to update one Position.
     * @example
     * // Update one Position
     * const position = await prisma.position.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionUpdateArgs>(args: SelectSubset<T, PositionUpdateArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Positions.
     * @param {PositionDeleteManyArgs} args - Arguments to filter Positions to delete.
     * @example
     * // Delete a few Positions
     * const { count } = await prisma.position.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionDeleteManyArgs>(args?: SelectSubset<T, PositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionUpdateManyArgs>(args: SelectSubset<T, PositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions and returns the data updated in the database.
     * @param {PositionUpdateManyAndReturnArgs} args - Arguments to update many Positions.
     * @example
     * // Update many Positions
     * const position = await prisma.position.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Positions and only return the `id`
     * const positionWithIdOnly = await prisma.position.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PositionUpdateManyAndReturnArgs>(args: SelectSubset<T, PositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Position.
     * @param {PositionUpsertArgs} args - Arguments to update or create a Position.
     * @example
     * // Update or create a Position
     * const position = await prisma.position.upsert({
     *   create: {
     *     // ... data to create a Position
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Position we want to update
     *   }
     * })
     */
    upsert<T extends PositionUpsertArgs>(args: SelectSubset<T, PositionUpsertArgs<ExtArgs>>): Prisma__PositionClient<$Result.GetResult<Prisma.$PositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionCountArgs} args - Arguments to filter Positions to count.
     * @example
     * // Count the number of Positions
     * const count = await prisma.position.count({
     *   where: {
     *     // ... the filter for the Positions we want to count
     *   }
     * })
    **/
    count<T extends PositionCountArgs>(
      args?: Subset<T, PositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PositionAggregateArgs>(args: Subset<T, PositionAggregateArgs>): Prisma.PrismaPromise<GetPositionAggregateType<T>>

    /**
     * Group by Position.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionGroupByArgs['orderBy'] }
        : { orderBy?: PositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Position model
   */
  readonly fields: PositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Position.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Position model
   */
  interface PositionFieldRefs {
    readonly id: FieldRef<"Position", 'String'>
    readonly portfolioId: FieldRef<"Position", 'String'>
    readonly symbol: FieldRef<"Position", 'String'>
    readonly quantity: FieldRef<"Position", 'Float'>
    readonly avgCost: FieldRef<"Position", 'Float'>
    readonly currentPrice: FieldRef<"Position", 'Float'>
    readonly boughtAt: FieldRef<"Position", 'DateTime'>
    readonly updatedAt: FieldRef<"Position", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Position findUnique
   */
  export type PositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findUniqueOrThrow
   */
  export type PositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position findFirst
   */
  export type PositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findFirstOrThrow
   */
  export type PositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Position to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Positions.
     */
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position findMany
   */
  export type PositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter, which Positions to fetch.
     */
    where?: PositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Positions to fetch.
     */
    orderBy?: PositionOrderByWithRelationInput | PositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Positions.
     */
    cursor?: PositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Positions.
     */
    skip?: number
    distinct?: PositionScalarFieldEnum | PositionScalarFieldEnum[]
  }

  /**
   * Position create
   */
  export type PositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to create a Position.
     */
    data: XOR<PositionCreateInput, PositionUncheckedCreateInput>
  }

  /**
   * Position createMany
   */
  export type PositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
  }

  /**
   * Position createManyAndReturn
   */
  export type PositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to create many Positions.
     */
    data: PositionCreateManyInput | PositionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position update
   */
  export type PositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The data needed to update a Position.
     */
    data: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
    /**
     * Choose, which Position to update.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position updateMany
   */
  export type PositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
  }

  /**
   * Position updateManyAndReturn
   */
  export type PositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * The data used to update Positions.
     */
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyInput>
    /**
     * Filter which Positions to update
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Position upsert
   */
  export type PositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * The filter to search for the Position to update in case it exists.
     */
    where: PositionWhereUniqueInput
    /**
     * In case the Position found by the `where` argument doesn't exist, create a new Position with this data.
     */
    create: XOR<PositionCreateInput, PositionUncheckedCreateInput>
    /**
     * In case the Position was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionUpdateInput, PositionUncheckedUpdateInput>
  }

  /**
   * Position delete
   */
  export type PositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
    /**
     * Filter which Position to delete.
     */
    where: PositionWhereUniqueInput
  }

  /**
   * Position deleteMany
   */
  export type PositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Positions to delete
     */
    where?: PositionWhereInput
    /**
     * Limit how many Positions to delete.
     */
    limit?: number
  }

  /**
   * Position without action
   */
  export type PositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Position
     */
    select?: PositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Position
     */
    omit?: PositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
    executedPrice: number | null
    commission: number | null
    stampTax: number | null
    transferFee: number | null
    netAmount: number | null
  }

  export type TradeSumAggregateOutputType = {
    quantity: number | null
    price: number | null
    executedPrice: number | null
    commission: number | null
    stampTax: number | null
    transferFee: number | null
    netAmount: number | null
  }

  export type TradeMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    symbol: string | null
    side: $Enums.TradeSide | null
    quantity: number | null
    price: number | null
    status: $Enums.TradeStatus | null
    filledAt: Date | null
    executedPrice: number | null
    note: string | null
    commission: number | null
    stampTax: number | null
    transferFee: number | null
    netAmount: number | null
    createdAt: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    symbol: string | null
    side: $Enums.TradeSide | null
    quantity: number | null
    price: number | null
    status: $Enums.TradeStatus | null
    filledAt: Date | null
    executedPrice: number | null
    note: string | null
    commission: number | null
    stampTax: number | null
    transferFee: number | null
    netAmount: number | null
    createdAt: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    agentId: number
    symbol: number
    side: number
    quantity: number
    price: number
    status: number
    filledAt: number
    executedPrice: number
    note: number
    commission: number
    stampTax: number
    transferFee: number
    netAmount: number
    createdAt: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    quantity?: true
    price?: true
    executedPrice?: true
    commission?: true
    stampTax?: true
    transferFee?: true
    netAmount?: true
  }

  export type TradeSumAggregateInputType = {
    quantity?: true
    price?: true
    executedPrice?: true
    commission?: true
    stampTax?: true
    transferFee?: true
    netAmount?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    agentId?: true
    symbol?: true
    side?: true
    quantity?: true
    price?: true
    status?: true
    filledAt?: true
    executedPrice?: true
    note?: true
    commission?: true
    stampTax?: true
    transferFee?: true
    netAmount?: true
    createdAt?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    agentId?: true
    symbol?: true
    side?: true
    quantity?: true
    price?: true
    status?: true
    filledAt?: true
    executedPrice?: true
    note?: true
    commission?: true
    stampTax?: true
    transferFee?: true
    netAmount?: true
    createdAt?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    agentId?: true
    symbol?: true
    side?: true
    quantity?: true
    price?: true
    status?: true
    filledAt?: true
    executedPrice?: true
    note?: true
    commission?: true
    stampTax?: true
    transferFee?: true
    netAmount?: true
    createdAt?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: string
    agentId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    price: number
    status: $Enums.TradeStatus
    filledAt: Date | null
    executedPrice: number | null
    note: string | null
    commission: number | null
    stampTax: number | null
    transferFee: number | null
    netAmount: number | null
    createdAt: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    status?: boolean
    filledAt?: boolean
    executedPrice?: boolean
    note?: boolean
    commission?: boolean
    stampTax?: boolean
    transferFee?: boolean
    netAmount?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    status?: boolean
    filledAt?: boolean
    executedPrice?: boolean
    note?: boolean
    commission?: boolean
    stampTax?: boolean
    transferFee?: boolean
    netAmount?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    status?: boolean
    filledAt?: boolean
    executedPrice?: boolean
    note?: boolean
    commission?: boolean
    stampTax?: boolean
    transferFee?: boolean
    netAmount?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    agentId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    status?: boolean
    filledAt?: boolean
    executedPrice?: boolean
    note?: boolean
    commission?: boolean
    stampTax?: boolean
    transferFee?: boolean
    netAmount?: boolean
    createdAt?: boolean
  }

  export type TradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "symbol" | "side" | "quantity" | "price" | "status" | "filledAt" | "executedPrice" | "note" | "commission" | "stampTax" | "transferFee" | "netAmount" | "createdAt", ExtArgs["result"]["trade"]>
  export type TradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type TradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type TradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      symbol: string
      side: $Enums.TradeSide
      quantity: number
      price: number
      status: $Enums.TradeStatus
      filledAt: Date | null
      executedPrice: number | null
      note: string | null
      commission: number | null
      stampTax: number | null
      transferFee: number | null
      netAmount: number | null
      createdAt: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades and returns the data updated in the database.
     * @param {TradeUpdateManyAndReturnArgs} args - Arguments to update many Trades.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'String'>
    readonly agentId: FieldRef<"Trade", 'String'>
    readonly symbol: FieldRef<"Trade", 'String'>
    readonly side: FieldRef<"Trade", 'TradeSide'>
    readonly quantity: FieldRef<"Trade", 'Float'>
    readonly price: FieldRef<"Trade", 'Float'>
    readonly status: FieldRef<"Trade", 'TradeStatus'>
    readonly filledAt: FieldRef<"Trade", 'DateTime'>
    readonly executedPrice: FieldRef<"Trade", 'Float'>
    readonly note: FieldRef<"Trade", 'String'>
    readonly commission: FieldRef<"Trade", 'Float'>
    readonly stampTax: FieldRef<"Trade", 'Float'>
    readonly transferFee: FieldRef<"Trade", 'Float'>
    readonly netAmount: FieldRef<"Trade", 'Float'>
    readonly createdAt: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade updateManyAndReturn
   */
  export type TradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to delete.
     */
    limit?: number
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
  }


  /**
   * Model Price
   */

  export type AggregatePrice = {
    _count: PriceCountAggregateOutputType | null
    _avg: PriceAvgAggregateOutputType | null
    _sum: PriceSumAggregateOutputType | null
    _min: PriceMinAggregateOutputType | null
    _max: PriceMaxAggregateOutputType | null
  }

  export type PriceAvgAggregateOutputType = {
    price: number | null
    prevClose: number | null
  }

  export type PriceSumAggregateOutputType = {
    price: number | null
    prevClose: number | null
  }

  export type PriceMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    name: string | null
    price: number | null
    prevClose: number | null
    updatedAt: Date | null
  }

  export type PriceMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    name: string | null
    price: number | null
    prevClose: number | null
    updatedAt: Date | null
  }

  export type PriceCountAggregateOutputType = {
    id: number
    symbol: number
    name: number
    price: number
    prevClose: number
    updatedAt: number
    _all: number
  }


  export type PriceAvgAggregateInputType = {
    price?: true
    prevClose?: true
  }

  export type PriceSumAggregateInputType = {
    price?: true
    prevClose?: true
  }

  export type PriceMinAggregateInputType = {
    id?: true
    symbol?: true
    name?: true
    price?: true
    prevClose?: true
    updatedAt?: true
  }

  export type PriceMaxAggregateInputType = {
    id?: true
    symbol?: true
    name?: true
    price?: true
    prevClose?: true
    updatedAt?: true
  }

  export type PriceCountAggregateInputType = {
    id?: true
    symbol?: true
    name?: true
    price?: true
    prevClose?: true
    updatedAt?: true
    _all?: true
  }

  export type PriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Price to aggregate.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prices
    **/
    _count?: true | PriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceMaxAggregateInputType
  }

  export type GetPriceAggregateType<T extends PriceAggregateArgs> = {
        [P in keyof T & keyof AggregatePrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrice[P]>
      : GetScalarType<T[P], AggregatePrice[P]>
  }




  export type PriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceWhereInput
    orderBy?: PriceOrderByWithAggregationInput | PriceOrderByWithAggregationInput[]
    by: PriceScalarFieldEnum[] | PriceScalarFieldEnum
    having?: PriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceCountAggregateInputType | true
    _avg?: PriceAvgAggregateInputType
    _sum?: PriceSumAggregateInputType
    _min?: PriceMinAggregateInputType
    _max?: PriceMaxAggregateInputType
  }

  export type PriceGroupByOutputType = {
    id: string
    symbol: string
    name: string | null
    price: number
    prevClose: number
    updatedAt: Date
    _count: PriceCountAggregateOutputType | null
    _avg: PriceAvgAggregateOutputType | null
    _sum: PriceSumAggregateOutputType | null
    _min: PriceMinAggregateOutputType | null
    _max: PriceMaxAggregateOutputType | null
  }

  type GetPriceGroupByPayload<T extends PriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceGroupByOutputType[P]>
            : GetScalarType<T[P], PriceGroupByOutputType[P]>
        }
      >
    >


  export type PriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    name?: boolean
    price?: boolean
    prevClose?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    name?: boolean
    price?: boolean
    prevClose?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    name?: boolean
    price?: boolean
    prevClose?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectScalar = {
    id?: boolean
    symbol?: boolean
    name?: boolean
    price?: boolean
    prevClose?: boolean
    updatedAt?: boolean
  }

  export type PriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "name" | "price" | "prevClose" | "updatedAt", ExtArgs["result"]["price"]>

  export type $PricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Price"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      name: string | null
      price: number
      prevClose: number
      updatedAt: Date
    }, ExtArgs["result"]["price"]>
    composites: {}
  }

  type PriceGetPayload<S extends boolean | null | undefined | PriceDefaultArgs> = $Result.GetResult<Prisma.$PricePayload, S>

  type PriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceCountAggregateInputType | true
    }

  export interface PriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Price'], meta: { name: 'Price' } }
    /**
     * Find zero or one Price that matches the filter.
     * @param {PriceFindUniqueArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceFindUniqueArgs>(args: SelectSubset<T, PriceFindUniqueArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Price that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceFindUniqueOrThrowArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Price that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindFirstArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceFindFirstArgs>(args?: SelectSubset<T, PriceFindFirstArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Price that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindFirstOrThrowArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prices
     * const prices = await prisma.price.findMany()
     * 
     * // Get first 10 Prices
     * const prices = await prisma.price.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceWithIdOnly = await prisma.price.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceFindManyArgs>(args?: SelectSubset<T, PriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Price.
     * @param {PriceCreateArgs} args - Arguments to create a Price.
     * @example
     * // Create one Price
     * const Price = await prisma.price.create({
     *   data: {
     *     // ... data to create a Price
     *   }
     * })
     * 
     */
    create<T extends PriceCreateArgs>(args: SelectSubset<T, PriceCreateArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prices.
     * @param {PriceCreateManyArgs} args - Arguments to create many Prices.
     * @example
     * // Create many Prices
     * const price = await prisma.price.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceCreateManyArgs>(args?: SelectSubset<T, PriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prices and returns the data saved in the database.
     * @param {PriceCreateManyAndReturnArgs} args - Arguments to create many Prices.
     * @example
     * // Create many Prices
     * const price = await prisma.price.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prices and only return the `id`
     * const priceWithIdOnly = await prisma.price.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Price.
     * @param {PriceDeleteArgs} args - Arguments to delete one Price.
     * @example
     * // Delete one Price
     * const Price = await prisma.price.delete({
     *   where: {
     *     // ... filter to delete one Price
     *   }
     * })
     * 
     */
    delete<T extends PriceDeleteArgs>(args: SelectSubset<T, PriceDeleteArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Price.
     * @param {PriceUpdateArgs} args - Arguments to update one Price.
     * @example
     * // Update one Price
     * const price = await prisma.price.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceUpdateArgs>(args: SelectSubset<T, PriceUpdateArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prices.
     * @param {PriceDeleteManyArgs} args - Arguments to filter Prices to delete.
     * @example
     * // Delete a few Prices
     * const { count } = await prisma.price.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceDeleteManyArgs>(args?: SelectSubset<T, PriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prices
     * const price = await prisma.price.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceUpdateManyArgs>(args: SelectSubset<T, PriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prices and returns the data updated in the database.
     * @param {PriceUpdateManyAndReturnArgs} args - Arguments to update many Prices.
     * @example
     * // Update many Prices
     * const price = await prisma.price.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prices and only return the `id`
     * const priceWithIdOnly = await prisma.price.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Price.
     * @param {PriceUpsertArgs} args - Arguments to update or create a Price.
     * @example
     * // Update or create a Price
     * const price = await prisma.price.upsert({
     *   create: {
     *     // ... data to create a Price
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Price we want to update
     *   }
     * })
     */
    upsert<T extends PriceUpsertArgs>(args: SelectSubset<T, PriceUpsertArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceCountArgs} args - Arguments to filter Prices to count.
     * @example
     * // Count the number of Prices
     * const count = await prisma.price.count({
     *   where: {
     *     // ... the filter for the Prices we want to count
     *   }
     * })
    **/
    count<T extends PriceCountArgs>(
      args?: Subset<T, PriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Price.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceAggregateArgs>(args: Subset<T, PriceAggregateArgs>): Prisma.PrismaPromise<GetPriceAggregateType<T>>

    /**
     * Group by Price.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceGroupByArgs['orderBy'] }
        : { orderBy?: PriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Price model
   */
  readonly fields: PriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Price.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Price model
   */
  interface PriceFieldRefs {
    readonly id: FieldRef<"Price", 'String'>
    readonly symbol: FieldRef<"Price", 'String'>
    readonly name: FieldRef<"Price", 'String'>
    readonly price: FieldRef<"Price", 'Float'>
    readonly prevClose: FieldRef<"Price", 'Float'>
    readonly updatedAt: FieldRef<"Price", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Price findUnique
   */
  export type PriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price findUniqueOrThrow
   */
  export type PriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price findFirst
   */
  export type PriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prices.
     */
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price findFirstOrThrow
   */
  export type PriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prices.
     */
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price findMany
   */
  export type PriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Prices to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price create
   */
  export type PriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data needed to create a Price.
     */
    data: XOR<PriceCreateInput, PriceUncheckedCreateInput>
  }

  /**
   * Price createMany
   */
  export type PriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prices.
     */
    data: PriceCreateManyInput | PriceCreateManyInput[]
  }

  /**
   * Price createManyAndReturn
   */
  export type PriceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data used to create many Prices.
     */
    data: PriceCreateManyInput | PriceCreateManyInput[]
  }

  /**
   * Price update
   */
  export type PriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data needed to update a Price.
     */
    data: XOR<PriceUpdateInput, PriceUncheckedUpdateInput>
    /**
     * Choose, which Price to update.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price updateMany
   */
  export type PriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prices.
     */
    data: XOR<PriceUpdateManyMutationInput, PriceUncheckedUpdateManyInput>
    /**
     * Filter which Prices to update
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to update.
     */
    limit?: number
  }

  /**
   * Price updateManyAndReturn
   */
  export type PriceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data used to update Prices.
     */
    data: XOR<PriceUpdateManyMutationInput, PriceUncheckedUpdateManyInput>
    /**
     * Filter which Prices to update
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to update.
     */
    limit?: number
  }

  /**
   * Price upsert
   */
  export type PriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The filter to search for the Price to update in case it exists.
     */
    where: PriceWhereUniqueInput
    /**
     * In case the Price found by the `where` argument doesn't exist, create a new Price with this data.
     */
    create: XOR<PriceCreateInput, PriceUncheckedCreateInput>
    /**
     * In case the Price was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceUpdateInput, PriceUncheckedUpdateInput>
  }

  /**
   * Price delete
   */
  export type PriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter which Price to delete.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price deleteMany
   */
  export type PriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prices to delete
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to delete.
     */
    limit?: number
  }

  /**
   * Price without action
   */
  export type PriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
  }


  /**
   * Model Lobster
   */

  export type AggregateLobster = {
    _count: LobsterCountAggregateOutputType | null
    _min: LobsterMinAggregateOutputType | null
    _max: LobsterMaxAggregateOutputType | null
  }

  export type LobsterMinAggregateOutputType = {
    id: string | null
    key: $Enums.LobsterKey | null
    name: string | null
    description: string | null
    color: string | null
    isActive: boolean | null
    agentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LobsterMaxAggregateOutputType = {
    id: string | null
    key: $Enums.LobsterKey | null
    name: string | null
    description: string | null
    color: string | null
    isActive: boolean | null
    agentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LobsterCountAggregateOutputType = {
    id: number
    key: number
    name: number
    description: number
    color: number
    isActive: number
    agentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LobsterMinAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    color?: true
    isActive?: true
    agentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LobsterMaxAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    color?: true
    isActive?: true
    agentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LobsterCountAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    color?: true
    isActive?: true
    agentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LobsterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lobster to aggregate.
     */
    where?: LobsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobsters to fetch.
     */
    orderBy?: LobsterOrderByWithRelationInput | LobsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LobsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobsters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lobsters
    **/
    _count?: true | LobsterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LobsterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LobsterMaxAggregateInputType
  }

  export type GetLobsterAggregateType<T extends LobsterAggregateArgs> = {
        [P in keyof T & keyof AggregateLobster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLobster[P]>
      : GetScalarType<T[P], AggregateLobster[P]>
  }




  export type LobsterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LobsterWhereInput
    orderBy?: LobsterOrderByWithAggregationInput | LobsterOrderByWithAggregationInput[]
    by: LobsterScalarFieldEnum[] | LobsterScalarFieldEnum
    having?: LobsterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LobsterCountAggregateInputType | true
    _min?: LobsterMinAggregateInputType
    _max?: LobsterMaxAggregateInputType
  }

  export type LobsterGroupByOutputType = {
    id: string
    key: $Enums.LobsterKey
    name: string
    description: string | null
    color: string | null
    isActive: boolean
    agentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: LobsterCountAggregateOutputType | null
    _min: LobsterMinAggregateOutputType | null
    _max: LobsterMaxAggregateOutputType | null
  }

  type GetLobsterGroupByPayload<T extends LobsterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LobsterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LobsterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LobsterGroupByOutputType[P]>
            : GetScalarType<T[P], LobsterGroupByOutputType[P]>
        }
      >
    >


  export type LobsterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deliveries?: boolean | Lobster$deliveriesArgs<ExtArgs>
    comments?: boolean | Lobster$commentsArgs<ExtArgs>
    logs?: boolean | Lobster$logsArgs<ExtArgs>
    _count?: boolean | LobsterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lobster"]>

  export type LobsterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lobster"]>

  export type LobsterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lobster"]>

  export type LobsterSelectScalar = {
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    isActive?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LobsterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "name" | "description" | "color" | "isActive" | "agentId" | "createdAt" | "updatedAt", ExtArgs["result"]["lobster"]>
  export type LobsterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | Lobster$deliveriesArgs<ExtArgs>
    comments?: boolean | Lobster$commentsArgs<ExtArgs>
    logs?: boolean | Lobster$logsArgs<ExtArgs>
    _count?: boolean | LobsterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LobsterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LobsterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LobsterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lobster"
    objects: {
      deliveries: Prisma.$DeliveryPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      logs: Prisma.$LogEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: $Enums.LobsterKey
      name: string
      description: string | null
      color: string | null
      isActive: boolean
      agentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lobster"]>
    composites: {}
  }

  type LobsterGetPayload<S extends boolean | null | undefined | LobsterDefaultArgs> = $Result.GetResult<Prisma.$LobsterPayload, S>

  type LobsterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LobsterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LobsterCountAggregateInputType | true
    }

  export interface LobsterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lobster'], meta: { name: 'Lobster' } }
    /**
     * Find zero or one Lobster that matches the filter.
     * @param {LobsterFindUniqueArgs} args - Arguments to find a Lobster
     * @example
     * // Get one Lobster
     * const lobster = await prisma.lobster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LobsterFindUniqueArgs>(args: SelectSubset<T, LobsterFindUniqueArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lobster that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LobsterFindUniqueOrThrowArgs} args - Arguments to find a Lobster
     * @example
     * // Get one Lobster
     * const lobster = await prisma.lobster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LobsterFindUniqueOrThrowArgs>(args: SelectSubset<T, LobsterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lobster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobsterFindFirstArgs} args - Arguments to find a Lobster
     * @example
     * // Get one Lobster
     * const lobster = await prisma.lobster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LobsterFindFirstArgs>(args?: SelectSubset<T, LobsterFindFirstArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lobster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobsterFindFirstOrThrowArgs} args - Arguments to find a Lobster
     * @example
     * // Get one Lobster
     * const lobster = await prisma.lobster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LobsterFindFirstOrThrowArgs>(args?: SelectSubset<T, LobsterFindFirstOrThrowArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lobsters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobsterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lobsters
     * const lobsters = await prisma.lobster.findMany()
     * 
     * // Get first 10 Lobsters
     * const lobsters = await prisma.lobster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lobsterWithIdOnly = await prisma.lobster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LobsterFindManyArgs>(args?: SelectSubset<T, LobsterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lobster.
     * @param {LobsterCreateArgs} args - Arguments to create a Lobster.
     * @example
     * // Create one Lobster
     * const Lobster = await prisma.lobster.create({
     *   data: {
     *     // ... data to create a Lobster
     *   }
     * })
     * 
     */
    create<T extends LobsterCreateArgs>(args: SelectSubset<T, LobsterCreateArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lobsters.
     * @param {LobsterCreateManyArgs} args - Arguments to create many Lobsters.
     * @example
     * // Create many Lobsters
     * const lobster = await prisma.lobster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LobsterCreateManyArgs>(args?: SelectSubset<T, LobsterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lobsters and returns the data saved in the database.
     * @param {LobsterCreateManyAndReturnArgs} args - Arguments to create many Lobsters.
     * @example
     * // Create many Lobsters
     * const lobster = await prisma.lobster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lobsters and only return the `id`
     * const lobsterWithIdOnly = await prisma.lobster.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LobsterCreateManyAndReturnArgs>(args?: SelectSubset<T, LobsterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lobster.
     * @param {LobsterDeleteArgs} args - Arguments to delete one Lobster.
     * @example
     * // Delete one Lobster
     * const Lobster = await prisma.lobster.delete({
     *   where: {
     *     // ... filter to delete one Lobster
     *   }
     * })
     * 
     */
    delete<T extends LobsterDeleteArgs>(args: SelectSubset<T, LobsterDeleteArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lobster.
     * @param {LobsterUpdateArgs} args - Arguments to update one Lobster.
     * @example
     * // Update one Lobster
     * const lobster = await prisma.lobster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LobsterUpdateArgs>(args: SelectSubset<T, LobsterUpdateArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lobsters.
     * @param {LobsterDeleteManyArgs} args - Arguments to filter Lobsters to delete.
     * @example
     * // Delete a few Lobsters
     * const { count } = await prisma.lobster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LobsterDeleteManyArgs>(args?: SelectSubset<T, LobsterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lobsters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobsterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lobsters
     * const lobster = await prisma.lobster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LobsterUpdateManyArgs>(args: SelectSubset<T, LobsterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lobsters and returns the data updated in the database.
     * @param {LobsterUpdateManyAndReturnArgs} args - Arguments to update many Lobsters.
     * @example
     * // Update many Lobsters
     * const lobster = await prisma.lobster.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lobsters and only return the `id`
     * const lobsterWithIdOnly = await prisma.lobster.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LobsterUpdateManyAndReturnArgs>(args: SelectSubset<T, LobsterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lobster.
     * @param {LobsterUpsertArgs} args - Arguments to update or create a Lobster.
     * @example
     * // Update or create a Lobster
     * const lobster = await prisma.lobster.upsert({
     *   create: {
     *     // ... data to create a Lobster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lobster we want to update
     *   }
     * })
     */
    upsert<T extends LobsterUpsertArgs>(args: SelectSubset<T, LobsterUpsertArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lobsters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobsterCountArgs} args - Arguments to filter Lobsters to count.
     * @example
     * // Count the number of Lobsters
     * const count = await prisma.lobster.count({
     *   where: {
     *     // ... the filter for the Lobsters we want to count
     *   }
     * })
    **/
    count<T extends LobsterCountArgs>(
      args?: Subset<T, LobsterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LobsterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lobster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobsterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LobsterAggregateArgs>(args: Subset<T, LobsterAggregateArgs>): Prisma.PrismaPromise<GetLobsterAggregateType<T>>

    /**
     * Group by Lobster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobsterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LobsterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LobsterGroupByArgs['orderBy'] }
        : { orderBy?: LobsterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LobsterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLobsterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lobster model
   */
  readonly fields: LobsterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lobster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LobsterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deliveries<T extends Lobster$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Lobster$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Lobster$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Lobster$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logs<T extends Lobster$logsArgs<ExtArgs> = {}>(args?: Subset<T, Lobster$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lobster model
   */
  interface LobsterFieldRefs {
    readonly id: FieldRef<"Lobster", 'String'>
    readonly key: FieldRef<"Lobster", 'LobsterKey'>
    readonly name: FieldRef<"Lobster", 'String'>
    readonly description: FieldRef<"Lobster", 'String'>
    readonly color: FieldRef<"Lobster", 'String'>
    readonly isActive: FieldRef<"Lobster", 'Boolean'>
    readonly agentId: FieldRef<"Lobster", 'String'>
    readonly createdAt: FieldRef<"Lobster", 'DateTime'>
    readonly updatedAt: FieldRef<"Lobster", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lobster findUnique
   */
  export type LobsterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * Filter, which Lobster to fetch.
     */
    where: LobsterWhereUniqueInput
  }

  /**
   * Lobster findUniqueOrThrow
   */
  export type LobsterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * Filter, which Lobster to fetch.
     */
    where: LobsterWhereUniqueInput
  }

  /**
   * Lobster findFirst
   */
  export type LobsterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * Filter, which Lobster to fetch.
     */
    where?: LobsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobsters to fetch.
     */
    orderBy?: LobsterOrderByWithRelationInput | LobsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lobsters.
     */
    cursor?: LobsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobsters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lobsters.
     */
    distinct?: LobsterScalarFieldEnum | LobsterScalarFieldEnum[]
  }

  /**
   * Lobster findFirstOrThrow
   */
  export type LobsterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * Filter, which Lobster to fetch.
     */
    where?: LobsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobsters to fetch.
     */
    orderBy?: LobsterOrderByWithRelationInput | LobsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lobsters.
     */
    cursor?: LobsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobsters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lobsters.
     */
    distinct?: LobsterScalarFieldEnum | LobsterScalarFieldEnum[]
  }

  /**
   * Lobster findMany
   */
  export type LobsterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * Filter, which Lobsters to fetch.
     */
    where?: LobsterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobsters to fetch.
     */
    orderBy?: LobsterOrderByWithRelationInput | LobsterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lobsters.
     */
    cursor?: LobsterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobsters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobsters.
     */
    skip?: number
    distinct?: LobsterScalarFieldEnum | LobsterScalarFieldEnum[]
  }

  /**
   * Lobster create
   */
  export type LobsterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * The data needed to create a Lobster.
     */
    data: XOR<LobsterCreateInput, LobsterUncheckedCreateInput>
  }

  /**
   * Lobster createMany
   */
  export type LobsterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lobsters.
     */
    data: LobsterCreateManyInput | LobsterCreateManyInput[]
  }

  /**
   * Lobster createManyAndReturn
   */
  export type LobsterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * The data used to create many Lobsters.
     */
    data: LobsterCreateManyInput | LobsterCreateManyInput[]
  }

  /**
   * Lobster update
   */
  export type LobsterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * The data needed to update a Lobster.
     */
    data: XOR<LobsterUpdateInput, LobsterUncheckedUpdateInput>
    /**
     * Choose, which Lobster to update.
     */
    where: LobsterWhereUniqueInput
  }

  /**
   * Lobster updateMany
   */
  export type LobsterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lobsters.
     */
    data: XOR<LobsterUpdateManyMutationInput, LobsterUncheckedUpdateManyInput>
    /**
     * Filter which Lobsters to update
     */
    where?: LobsterWhereInput
    /**
     * Limit how many Lobsters to update.
     */
    limit?: number
  }

  /**
   * Lobster updateManyAndReturn
   */
  export type LobsterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * The data used to update Lobsters.
     */
    data: XOR<LobsterUpdateManyMutationInput, LobsterUncheckedUpdateManyInput>
    /**
     * Filter which Lobsters to update
     */
    where?: LobsterWhereInput
    /**
     * Limit how many Lobsters to update.
     */
    limit?: number
  }

  /**
   * Lobster upsert
   */
  export type LobsterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * The filter to search for the Lobster to update in case it exists.
     */
    where: LobsterWhereUniqueInput
    /**
     * In case the Lobster found by the `where` argument doesn't exist, create a new Lobster with this data.
     */
    create: XOR<LobsterCreateInput, LobsterUncheckedCreateInput>
    /**
     * In case the Lobster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LobsterUpdateInput, LobsterUncheckedUpdateInput>
  }

  /**
   * Lobster delete
   */
  export type LobsterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    /**
     * Filter which Lobster to delete.
     */
    where: LobsterWhereUniqueInput
  }

  /**
   * Lobster deleteMany
   */
  export type LobsterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lobsters to delete
     */
    where?: LobsterWhereInput
    /**
     * Limit how many Lobsters to delete.
     */
    limit?: number
  }

  /**
   * Lobster.deliveries
   */
  export type Lobster$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    cursor?: DeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Lobster.comments
   */
  export type Lobster$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Lobster.logs
   */
  export type Lobster$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    where?: LogEntryWhereInput
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    cursor?: LogEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * Lobster without action
   */
  export type LobsterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
  }


  /**
   * Model Delivery
   */

  export type AggregateDelivery = {
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  export type DeliveryAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type DeliverySumAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type DeliveryMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    lobsterId: string | null
    symbol: string | null
    side: $Enums.DeliverySide | null
    quantity: number | null
    price: number | null
    deliveredAt: Date | null
    note: string | null
    createdAt: Date | null
  }

  export type DeliveryMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    lobsterId: string | null
    symbol: string | null
    side: $Enums.DeliverySide | null
    quantity: number | null
    price: number | null
    deliveredAt: Date | null
    note: string | null
    createdAt: Date | null
  }

  export type DeliveryCountAggregateOutputType = {
    id: number
    agentId: number
    lobsterId: number
    symbol: number
    side: number
    quantity: number
    price: number
    deliveredAt: number
    note: number
    createdAt: number
    _all: number
  }


  export type DeliveryAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type DeliverySumAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type DeliveryMinAggregateInputType = {
    id?: true
    agentId?: true
    lobsterId?: true
    symbol?: true
    side?: true
    quantity?: true
    price?: true
    deliveredAt?: true
    note?: true
    createdAt?: true
  }

  export type DeliveryMaxAggregateInputType = {
    id?: true
    agentId?: true
    lobsterId?: true
    symbol?: true
    side?: true
    quantity?: true
    price?: true
    deliveredAt?: true
    note?: true
    createdAt?: true
  }

  export type DeliveryCountAggregateInputType = {
    id?: true
    agentId?: true
    lobsterId?: true
    symbol?: true
    side?: true
    quantity?: true
    price?: true
    deliveredAt?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type DeliveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delivery to aggregate.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deliveries
    **/
    _count?: true | DeliveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryMaxAggregateInputType
  }

  export type GetDeliveryAggregateType<T extends DeliveryAggregateArgs> = {
        [P in keyof T & keyof AggregateDelivery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelivery[P]>
      : GetScalarType<T[P], AggregateDelivery[P]>
  }




  export type DeliveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithAggregationInput | DeliveryOrderByWithAggregationInput[]
    by: DeliveryScalarFieldEnum[] | DeliveryScalarFieldEnum
    having?: DeliveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryCountAggregateInputType | true
    _avg?: DeliveryAvgAggregateInputType
    _sum?: DeliverySumAggregateInputType
    _min?: DeliveryMinAggregateInputType
    _max?: DeliveryMaxAggregateInputType
  }

  export type DeliveryGroupByOutputType = {
    id: string
    agentId: string
    lobsterId: string | null
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date
    note: string | null
    createdAt: Date
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  type GetDeliveryGroupByPayload<T extends DeliveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
        }
      >
    >


  export type DeliverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    lobsterId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    deliveredAt?: boolean
    note?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    lobster?: boolean | Delivery$lobsterArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    lobsterId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    deliveredAt?: boolean
    note?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    lobster?: boolean | Delivery$lobsterArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    lobsterId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    deliveredAt?: boolean
    note?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    lobster?: boolean | Delivery$lobsterArgs<ExtArgs>
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectScalar = {
    id?: boolean
    agentId?: boolean
    lobsterId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    price?: boolean
    deliveredAt?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type DeliveryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "lobsterId" | "symbol" | "side" | "quantity" | "price" | "deliveredAt" | "note" | "createdAt", ExtArgs["result"]["delivery"]>
  export type DeliveryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    lobster?: boolean | Delivery$lobsterArgs<ExtArgs>
  }
  export type DeliveryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    lobster?: boolean | Delivery$lobsterArgs<ExtArgs>
  }
  export type DeliveryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    lobster?: boolean | Delivery$lobsterArgs<ExtArgs>
  }

  export type $DeliveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Delivery"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      lobster: Prisma.$LobsterPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      lobsterId: string | null
      symbol: string
      side: $Enums.DeliverySide
      quantity: number
      price: number
      deliveredAt: Date
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["delivery"]>
    composites: {}
  }

  type DeliveryGetPayload<S extends boolean | null | undefined | DeliveryDefaultArgs> = $Result.GetResult<Prisma.$DeliveryPayload, S>

  type DeliveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryCountAggregateInputType | true
    }

  export interface DeliveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Delivery'], meta: { name: 'Delivery' } }
    /**
     * Find zero or one Delivery that matches the filter.
     * @param {DeliveryFindUniqueArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryFindUniqueArgs>(args: SelectSubset<T, DeliveryFindUniqueArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Delivery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryFindUniqueOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryFindFirstArgs>(args?: SelectSubset<T, DeliveryFindFirstArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deliveries
     * const deliveries = await prisma.delivery.findMany()
     * 
     * // Get first 10 Deliveries
     * const deliveries = await prisma.delivery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryWithIdOnly = await prisma.delivery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryFindManyArgs>(args?: SelectSubset<T, DeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Delivery.
     * @param {DeliveryCreateArgs} args - Arguments to create a Delivery.
     * @example
     * // Create one Delivery
     * const Delivery = await prisma.delivery.create({
     *   data: {
     *     // ... data to create a Delivery
     *   }
     * })
     * 
     */
    create<T extends DeliveryCreateArgs>(args: SelectSubset<T, DeliveryCreateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deliveries.
     * @param {DeliveryCreateManyArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryCreateManyArgs>(args?: SelectSubset<T, DeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deliveries and returns the data saved in the database.
     * @param {DeliveryCreateManyAndReturnArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deliveries and only return the `id`
     * const deliveryWithIdOnly = await prisma.delivery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Delivery.
     * @param {DeliveryDeleteArgs} args - Arguments to delete one Delivery.
     * @example
     * // Delete one Delivery
     * const Delivery = await prisma.delivery.delete({
     *   where: {
     *     // ... filter to delete one Delivery
     *   }
     * })
     * 
     */
    delete<T extends DeliveryDeleteArgs>(args: SelectSubset<T, DeliveryDeleteArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Delivery.
     * @param {DeliveryUpdateArgs} args - Arguments to update one Delivery.
     * @example
     * // Update one Delivery
     * const delivery = await prisma.delivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryUpdateArgs>(args: SelectSubset<T, DeliveryUpdateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deliveries.
     * @param {DeliveryDeleteManyArgs} args - Arguments to filter Deliveries to delete.
     * @example
     * // Delete a few Deliveries
     * const { count } = await prisma.delivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryDeleteManyArgs>(args?: SelectSubset<T, DeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deliveries
     * const delivery = await prisma.delivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryUpdateManyArgs>(args: SelectSubset<T, DeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliveries and returns the data updated in the database.
     * @param {DeliveryUpdateManyAndReturnArgs} args - Arguments to update many Deliveries.
     * @example
     * // Update many Deliveries
     * const delivery = await prisma.delivery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deliveries and only return the `id`
     * const deliveryWithIdOnly = await prisma.delivery.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeliveryUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Delivery.
     * @param {DeliveryUpsertArgs} args - Arguments to update or create a Delivery.
     * @example
     * // Update or create a Delivery
     * const delivery = await prisma.delivery.upsert({
     *   create: {
     *     // ... data to create a Delivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delivery we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryUpsertArgs>(args: SelectSubset<T, DeliveryUpsertArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryCountArgs} args - Arguments to filter Deliveries to count.
     * @example
     * // Count the number of Deliveries
     * const count = await prisma.delivery.count({
     *   where: {
     *     // ... the filter for the Deliveries we want to count
     *   }
     * })
    **/
    count<T extends DeliveryCountArgs>(
      args?: Subset<T, DeliveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliveryAggregateArgs>(args: Subset<T, DeliveryAggregateArgs>): Prisma.PrismaPromise<GetDeliveryAggregateType<T>>

    /**
     * Group by Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Delivery model
   */
  readonly fields: DeliveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Delivery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lobster<T extends Delivery$lobsterArgs<ExtArgs> = {}>(args?: Subset<T, Delivery$lobsterArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Delivery model
   */
  interface DeliveryFieldRefs {
    readonly id: FieldRef<"Delivery", 'String'>
    readonly agentId: FieldRef<"Delivery", 'String'>
    readonly lobsterId: FieldRef<"Delivery", 'String'>
    readonly symbol: FieldRef<"Delivery", 'String'>
    readonly side: FieldRef<"Delivery", 'DeliverySide'>
    readonly quantity: FieldRef<"Delivery", 'Float'>
    readonly price: FieldRef<"Delivery", 'Float'>
    readonly deliveredAt: FieldRef<"Delivery", 'DateTime'>
    readonly note: FieldRef<"Delivery", 'String'>
    readonly createdAt: FieldRef<"Delivery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Delivery findUnique
   */
  export type DeliveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findUniqueOrThrow
   */
  export type DeliveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findFirst
   */
  export type DeliveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findFirstOrThrow
   */
  export type DeliveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findMany
   */
  export type DeliveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter, which Deliveries to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery create
   */
  export type DeliveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The data needed to create a Delivery.
     */
    data: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
  }

  /**
   * Delivery createMany
   */
  export type DeliveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
  }

  /**
   * Delivery createManyAndReturn
   */
  export type DeliveryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Delivery update
   */
  export type DeliveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The data needed to update a Delivery.
     */
    data: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
    /**
     * Choose, which Delivery to update.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery updateMany
   */
  export type DeliveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deliveries.
     */
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyInput>
    /**
     * Filter which Deliveries to update
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to update.
     */
    limit?: number
  }

  /**
   * Delivery updateManyAndReturn
   */
  export type DeliveryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data used to update Deliveries.
     */
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyInput>
    /**
     * Filter which Deliveries to update
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Delivery upsert
   */
  export type DeliveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * The filter to search for the Delivery to update in case it exists.
     */
    where: DeliveryWhereUniqueInput
    /**
     * In case the Delivery found by the `where` argument doesn't exist, create a new Delivery with this data.
     */
    create: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
    /**
     * In case the Delivery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
  }

  /**
   * Delivery delete
   */
  export type DeliveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
    /**
     * Filter which Delivery to delete.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery deleteMany
   */
  export type DeliveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deliveries to delete
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to delete.
     */
    limit?: number
  }

  /**
   * Delivery.lobster
   */
  export type Delivery$lobsterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    where?: LobsterWhereInput
  }

  /**
   * Delivery without action
   */
  export type DeliveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    sentiment: number | null
  }

  export type CommentSumAggregateOutputType = {
    sentiment: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    author: string | null
    content: string | null
    sentiment: number | null
    lobsterId: string | null
    agentId: string | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    author: string | null
    content: string | null
    sentiment: number | null
    lobsterId: string | null
    agentId: string | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    author: number
    content: number
    sentiment: number
    lobsterId: number
    agentId: number
    createdAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    sentiment?: true
  }

  export type CommentSumAggregateInputType = {
    sentiment?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    author?: true
    content?: true
    sentiment?: true
    lobsterId?: true
    agentId?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    author?: true
    content?: true
    sentiment?: true
    lobsterId?: true
    agentId?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    author?: true
    content?: true
    sentiment?: true
    lobsterId?: true
    agentId?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    author: string
    content: string
    sentiment: number | null
    lobsterId: string | null
    agentId: string | null
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author?: boolean
    content?: boolean
    sentiment?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
    lobster?: boolean | Comment$lobsterArgs<ExtArgs>
    agent?: boolean | Comment$agentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author?: boolean
    content?: boolean
    sentiment?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
    lobster?: boolean | Comment$lobsterArgs<ExtArgs>
    agent?: boolean | Comment$agentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author?: boolean
    content?: boolean
    sentiment?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
    lobster?: boolean | Comment$lobsterArgs<ExtArgs>
    agent?: boolean | Comment$agentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    author?: boolean
    content?: boolean
    sentiment?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "author" | "content" | "sentiment" | "lobsterId" | "agentId" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobster?: boolean | Comment$lobsterArgs<ExtArgs>
    agent?: boolean | Comment$agentArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobster?: boolean | Comment$lobsterArgs<ExtArgs>
    agent?: boolean | Comment$agentArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobster?: boolean | Comment$lobsterArgs<ExtArgs>
    agent?: boolean | Comment$agentArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      lobster: Prisma.$LobsterPayload<ExtArgs> | null
      agent: Prisma.$AgentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      author: string
      content: string
      sentiment: number | null
      lobsterId: string | null
      agentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lobster<T extends Comment$lobsterArgs<ExtArgs> = {}>(args?: Subset<T, Comment$lobsterArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    agent<T extends Comment$agentArgs<ExtArgs> = {}>(args?: Subset<T, Comment$agentArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly author: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly sentiment: FieldRef<"Comment", 'Int'>
    readonly lobsterId: FieldRef<"Comment", 'String'>
    readonly agentId: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment.lobster
   */
  export type Comment$lobsterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    where?: LobsterWhereInput
  }

  /**
   * Comment.agent
   */
  export type Comment$agentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model LogEntry
   */

  export type AggregateLogEntry = {
    _count: LogEntryCountAggregateOutputType | null
    _min: LogEntryMinAggregateOutputType | null
    _max: LogEntryMaxAggregateOutputType | null
  }

  export type LogEntryMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    level: string | null
    lobsterId: string | null
    agentId: string | null
    createdAt: Date | null
  }

  export type LogEntryMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    level: string | null
    lobsterId: string | null
    agentId: string | null
    createdAt: Date | null
  }

  export type LogEntryCountAggregateOutputType = {
    id: number
    title: number
    content: number
    level: number
    lobsterId: number
    agentId: number
    createdAt: number
    _all: number
  }


  export type LogEntryMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    level?: true
    lobsterId?: true
    agentId?: true
    createdAt?: true
  }

  export type LogEntryMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    level?: true
    lobsterId?: true
    agentId?: true
    createdAt?: true
  }

  export type LogEntryCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    level?: true
    lobsterId?: true
    agentId?: true
    createdAt?: true
    _all?: true
  }

  export type LogEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogEntry to aggregate.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogEntries
    **/
    _count?: true | LogEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogEntryMaxAggregateInputType
  }

  export type GetLogEntryAggregateType<T extends LogEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLogEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogEntry[P]>
      : GetScalarType<T[P], AggregateLogEntry[P]>
  }




  export type LogEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogEntryWhereInput
    orderBy?: LogEntryOrderByWithAggregationInput | LogEntryOrderByWithAggregationInput[]
    by: LogEntryScalarFieldEnum[] | LogEntryScalarFieldEnum
    having?: LogEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogEntryCountAggregateInputType | true
    _min?: LogEntryMinAggregateInputType
    _max?: LogEntryMaxAggregateInputType
  }

  export type LogEntryGroupByOutputType = {
    id: string
    title: string
    content: string
    level: string
    lobsterId: string | null
    agentId: string | null
    createdAt: Date
    _count: LogEntryCountAggregateOutputType | null
    _min: LogEntryMinAggregateOutputType | null
    _max: LogEntryMaxAggregateOutputType | null
  }

  type GetLogEntryGroupByPayload<T extends LogEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LogEntryGroupByOutputType[P]>
        }
      >
    >


  export type LogEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    level?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
    lobster?: boolean | LogEntry$lobsterArgs<ExtArgs>
    agent?: boolean | LogEntry$agentArgs<ExtArgs>
  }, ExtArgs["result"]["logEntry"]>

  export type LogEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    level?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
    lobster?: boolean | LogEntry$lobsterArgs<ExtArgs>
    agent?: boolean | LogEntry$agentArgs<ExtArgs>
  }, ExtArgs["result"]["logEntry"]>

  export type LogEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    level?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
    lobster?: boolean | LogEntry$lobsterArgs<ExtArgs>
    agent?: boolean | LogEntry$agentArgs<ExtArgs>
  }, ExtArgs["result"]["logEntry"]>

  export type LogEntrySelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    level?: boolean
    lobsterId?: boolean
    agentId?: boolean
    createdAt?: boolean
  }

  export type LogEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "level" | "lobsterId" | "agentId" | "createdAt", ExtArgs["result"]["logEntry"]>
  export type LogEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobster?: boolean | LogEntry$lobsterArgs<ExtArgs>
    agent?: boolean | LogEntry$agentArgs<ExtArgs>
  }
  export type LogEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobster?: boolean | LogEntry$lobsterArgs<ExtArgs>
    agent?: boolean | LogEntry$agentArgs<ExtArgs>
  }
  export type LogEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobster?: boolean | LogEntry$lobsterArgs<ExtArgs>
    agent?: boolean | LogEntry$agentArgs<ExtArgs>
  }

  export type $LogEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LogEntry"
    objects: {
      lobster: Prisma.$LobsterPayload<ExtArgs> | null
      agent: Prisma.$AgentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      level: string
      lobsterId: string | null
      agentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["logEntry"]>
    composites: {}
  }

  type LogEntryGetPayload<S extends boolean | null | undefined | LogEntryDefaultArgs> = $Result.GetResult<Prisma.$LogEntryPayload, S>

  type LogEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LogEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogEntryCountAggregateInputType | true
    }

  export interface LogEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LogEntry'], meta: { name: 'LogEntry' } }
    /**
     * Find zero or one LogEntry that matches the filter.
     * @param {LogEntryFindUniqueArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogEntryFindUniqueArgs>(args: SelectSubset<T, LogEntryFindUniqueArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LogEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LogEntryFindUniqueOrThrowArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, LogEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryFindFirstArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogEntryFindFirstArgs>(args?: SelectSubset<T, LogEntryFindFirstArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryFindFirstOrThrowArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, LogEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LogEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogEntries
     * const logEntries = await prisma.logEntry.findMany()
     * 
     * // Get first 10 LogEntries
     * const logEntries = await prisma.logEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logEntryWithIdOnly = await prisma.logEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogEntryFindManyArgs>(args?: SelectSubset<T, LogEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LogEntry.
     * @param {LogEntryCreateArgs} args - Arguments to create a LogEntry.
     * @example
     * // Create one LogEntry
     * const LogEntry = await prisma.logEntry.create({
     *   data: {
     *     // ... data to create a LogEntry
     *   }
     * })
     * 
     */
    create<T extends LogEntryCreateArgs>(args: SelectSubset<T, LogEntryCreateArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LogEntries.
     * @param {LogEntryCreateManyArgs} args - Arguments to create many LogEntries.
     * @example
     * // Create many LogEntries
     * const logEntry = await prisma.logEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogEntryCreateManyArgs>(args?: SelectSubset<T, LogEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LogEntries and returns the data saved in the database.
     * @param {LogEntryCreateManyAndReturnArgs} args - Arguments to create many LogEntries.
     * @example
     * // Create many LogEntries
     * const logEntry = await prisma.logEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LogEntries and only return the `id`
     * const logEntryWithIdOnly = await prisma.logEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LogEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, LogEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LogEntry.
     * @param {LogEntryDeleteArgs} args - Arguments to delete one LogEntry.
     * @example
     * // Delete one LogEntry
     * const LogEntry = await prisma.logEntry.delete({
     *   where: {
     *     // ... filter to delete one LogEntry
     *   }
     * })
     * 
     */
    delete<T extends LogEntryDeleteArgs>(args: SelectSubset<T, LogEntryDeleteArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LogEntry.
     * @param {LogEntryUpdateArgs} args - Arguments to update one LogEntry.
     * @example
     * // Update one LogEntry
     * const logEntry = await prisma.logEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogEntryUpdateArgs>(args: SelectSubset<T, LogEntryUpdateArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LogEntries.
     * @param {LogEntryDeleteManyArgs} args - Arguments to filter LogEntries to delete.
     * @example
     * // Delete a few LogEntries
     * const { count } = await prisma.logEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogEntryDeleteManyArgs>(args?: SelectSubset<T, LogEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogEntries
     * const logEntry = await prisma.logEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogEntryUpdateManyArgs>(args: SelectSubset<T, LogEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogEntries and returns the data updated in the database.
     * @param {LogEntryUpdateManyAndReturnArgs} args - Arguments to update many LogEntries.
     * @example
     * // Update many LogEntries
     * const logEntry = await prisma.logEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LogEntries and only return the `id`
     * const logEntryWithIdOnly = await prisma.logEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LogEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, LogEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LogEntry.
     * @param {LogEntryUpsertArgs} args - Arguments to update or create a LogEntry.
     * @example
     * // Update or create a LogEntry
     * const logEntry = await prisma.logEntry.upsert({
     *   create: {
     *     // ... data to create a LogEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogEntry we want to update
     *   }
     * })
     */
    upsert<T extends LogEntryUpsertArgs>(args: SelectSubset<T, LogEntryUpsertArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LogEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryCountArgs} args - Arguments to filter LogEntries to count.
     * @example
     * // Count the number of LogEntries
     * const count = await prisma.logEntry.count({
     *   where: {
     *     // ... the filter for the LogEntries we want to count
     *   }
     * })
    **/
    count<T extends LogEntryCountArgs>(
      args?: Subset<T, LogEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogEntryAggregateArgs>(args: Subset<T, LogEntryAggregateArgs>): Prisma.PrismaPromise<GetLogEntryAggregateType<T>>

    /**
     * Group by LogEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogEntryGroupByArgs['orderBy'] }
        : { orderBy?: LogEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LogEntry model
   */
  readonly fields: LogEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LogEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lobster<T extends LogEntry$lobsterArgs<ExtArgs> = {}>(args?: Subset<T, LogEntry$lobsterArgs<ExtArgs>>): Prisma__LobsterClient<$Result.GetResult<Prisma.$LobsterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    agent<T extends LogEntry$agentArgs<ExtArgs> = {}>(args?: Subset<T, LogEntry$agentArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LogEntry model
   */
  interface LogEntryFieldRefs {
    readonly id: FieldRef<"LogEntry", 'String'>
    readonly title: FieldRef<"LogEntry", 'String'>
    readonly content: FieldRef<"LogEntry", 'String'>
    readonly level: FieldRef<"LogEntry", 'String'>
    readonly lobsterId: FieldRef<"LogEntry", 'String'>
    readonly agentId: FieldRef<"LogEntry", 'String'>
    readonly createdAt: FieldRef<"LogEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LogEntry findUnique
   */
  export type LogEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry findUniqueOrThrow
   */
  export type LogEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry findFirst
   */
  export type LogEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogEntries.
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogEntries.
     */
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * LogEntry findFirstOrThrow
   */
  export type LogEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogEntries.
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogEntries.
     */
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * LogEntry findMany
   */
  export type LogEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * Filter, which LogEntries to fetch.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogEntries.
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * LogEntry create
   */
  export type LogEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a LogEntry.
     */
    data: XOR<LogEntryCreateInput, LogEntryUncheckedCreateInput>
  }

  /**
   * LogEntry createMany
   */
  export type LogEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LogEntries.
     */
    data: LogEntryCreateManyInput | LogEntryCreateManyInput[]
  }

  /**
   * LogEntry createManyAndReturn
   */
  export type LogEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * The data used to create many LogEntries.
     */
    data: LogEntryCreateManyInput | LogEntryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LogEntry update
   */
  export type LogEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a LogEntry.
     */
    data: XOR<LogEntryUpdateInput, LogEntryUncheckedUpdateInput>
    /**
     * Choose, which LogEntry to update.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry updateMany
   */
  export type LogEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LogEntries.
     */
    data: XOR<LogEntryUpdateManyMutationInput, LogEntryUncheckedUpdateManyInput>
    /**
     * Filter which LogEntries to update
     */
    where?: LogEntryWhereInput
    /**
     * Limit how many LogEntries to update.
     */
    limit?: number
  }

  /**
   * LogEntry updateManyAndReturn
   */
  export type LogEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * The data used to update LogEntries.
     */
    data: XOR<LogEntryUpdateManyMutationInput, LogEntryUncheckedUpdateManyInput>
    /**
     * Filter which LogEntries to update
     */
    where?: LogEntryWhereInput
    /**
     * Limit how many LogEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LogEntry upsert
   */
  export type LogEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the LogEntry to update in case it exists.
     */
    where: LogEntryWhereUniqueInput
    /**
     * In case the LogEntry found by the `where` argument doesn't exist, create a new LogEntry with this data.
     */
    create: XOR<LogEntryCreateInput, LogEntryUncheckedCreateInput>
    /**
     * In case the LogEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogEntryUpdateInput, LogEntryUncheckedUpdateInput>
  }

  /**
   * LogEntry delete
   */
  export type LogEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
    /**
     * Filter which LogEntry to delete.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry deleteMany
   */
  export type LogEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogEntries to delete
     */
    where?: LogEntryWhereInput
    /**
     * Limit how many LogEntries to delete.
     */
    limit?: number
  }

  /**
   * LogEntry.lobster
   */
  export type LogEntry$lobsterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobster
     */
    select?: LobsterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobster
     */
    omit?: LobsterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobsterInclude<ExtArgs> | null
    where?: LobsterWhereInput
  }

  /**
   * LogEntry.agent
   */
  export type LogEntry$agentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
  }

  /**
   * LogEntry without action
   */
  export type LogEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogEntry
     */
    omit?: LogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogEntryInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    quantity: number | null
  }

  export type OrderSumAggregateOutputType = {
    quantity: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    competitionId: string | null
    portfolioId: string | null
    symbol: string | null
    side: $Enums.TradeSide | null
    quantity: number | null
    note: string | null
    status: string | null
    rejectReason: string | null
    submittedAt: Date | null
    matchedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    competitionId: string | null
    portfolioId: string | null
    symbol: string | null
    side: $Enums.TradeSide | null
    quantity: number | null
    note: string | null
    status: string | null
    rejectReason: string | null
    submittedAt: Date | null
    matchedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    agentId: number
    competitionId: number
    portfolioId: number
    symbol: number
    side: number
    quantity: number
    note: number
    status: number
    rejectReason: number
    submittedAt: number
    matchedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    quantity?: true
  }

  export type OrderSumAggregateInputType = {
    quantity?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    agentId?: true
    competitionId?: true
    portfolioId?: true
    symbol?: true
    side?: true
    quantity?: true
    note?: true
    status?: true
    rejectReason?: true
    submittedAt?: true
    matchedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    agentId?: true
    competitionId?: true
    portfolioId?: true
    symbol?: true
    side?: true
    quantity?: true
    note?: true
    status?: true
    rejectReason?: true
    submittedAt?: true
    matchedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    agentId?: true
    competitionId?: true
    portfolioId?: true
    symbol?: true
    side?: true
    quantity?: true
    note?: true
    status?: true
    rejectReason?: true
    submittedAt?: true
    matchedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    agentId: string
    competitionId: string
    portfolioId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note: string | null
    status: string
    rejectReason: string | null
    submittedAt: Date
    matchedAt: Date | null
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    portfolioId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    note?: boolean
    status?: boolean
    rejectReason?: boolean
    submittedAt?: boolean
    matchedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    portfolioId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    note?: boolean
    status?: boolean
    rejectReason?: boolean
    submittedAt?: boolean
    matchedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    portfolioId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    note?: boolean
    status?: boolean
    rejectReason?: boolean
    submittedAt?: boolean
    matchedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    agentId?: boolean
    competitionId?: boolean
    portfolioId?: boolean
    symbol?: boolean
    side?: boolean
    quantity?: boolean
    note?: boolean
    status?: boolean
    rejectReason?: boolean
    submittedAt?: boolean
    matchedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "competitionId" | "portfolioId" | "symbol" | "side" | "quantity" | "note" | "status" | "rejectReason" | "submittedAt" | "matchedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    competition?: boolean | CompetitionDefaultArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      competition: Prisma.$CompetitionPayload<ExtArgs>
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      competitionId: string
      portfolioId: string
      symbol: string
      side: $Enums.TradeSide
      quantity: number
      note: string | null
      status: string
      rejectReason: string | null
      submittedAt: Date
      matchedAt: Date | null
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    competition<T extends CompetitionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompetitionDefaultArgs<ExtArgs>>): Prisma__CompetitionClient<$Result.GetResult<Prisma.$CompetitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly agentId: FieldRef<"Order", 'String'>
    readonly competitionId: FieldRef<"Order", 'String'>
    readonly portfolioId: FieldRef<"Order", 'String'>
    readonly symbol: FieldRef<"Order", 'String'>
    readonly side: FieldRef<"Order", 'TradeSide'>
    readonly quantity: FieldRef<"Order", 'Float'>
    readonly note: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly rejectReason: FieldRef<"Order", 'String'>
    readonly submittedAt: FieldRef<"Order", 'DateTime'>
    readonly matchedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model DailySettlement
   */

  export type AggregateDailySettlement = {
    _count: DailySettlementCountAggregateOutputType | null
    _avg: DailySettlementAvgAggregateOutputType | null
    _sum: DailySettlementSumAggregateOutputType | null
    _min: DailySettlementMinAggregateOutputType | null
    _max: DailySettlementMaxAggregateOutputType | null
  }

  export type DailySettlementAvgAggregateOutputType = {
    cash: number | null
    positionDays: number | null
    totalValue: number | null
    returnPct: number | null
  }

  export type DailySettlementSumAggregateOutputType = {
    cash: number | null
    positionDays: number | null
    totalValue: number | null
    returnPct: number | null
  }

  export type DailySettlementMinAggregateOutputType = {
    id: string | null
    portfolioId: string | null
    date: string | null
    cash: number | null
    positionJson: string | null
    positionDays: number | null
    totalValue: number | null
    returnPct: number | null
    createdAt: Date | null
  }

  export type DailySettlementMaxAggregateOutputType = {
    id: string | null
    portfolioId: string | null
    date: string | null
    cash: number | null
    positionJson: string | null
    positionDays: number | null
    totalValue: number | null
    returnPct: number | null
    createdAt: Date | null
  }

  export type DailySettlementCountAggregateOutputType = {
    id: number
    portfolioId: number
    date: number
    cash: number
    positionJson: number
    positionDays: number
    totalValue: number
    returnPct: number
    createdAt: number
    _all: number
  }


  export type DailySettlementAvgAggregateInputType = {
    cash?: true
    positionDays?: true
    totalValue?: true
    returnPct?: true
  }

  export type DailySettlementSumAggregateInputType = {
    cash?: true
    positionDays?: true
    totalValue?: true
    returnPct?: true
  }

  export type DailySettlementMinAggregateInputType = {
    id?: true
    portfolioId?: true
    date?: true
    cash?: true
    positionJson?: true
    positionDays?: true
    totalValue?: true
    returnPct?: true
    createdAt?: true
  }

  export type DailySettlementMaxAggregateInputType = {
    id?: true
    portfolioId?: true
    date?: true
    cash?: true
    positionJson?: true
    positionDays?: true
    totalValue?: true
    returnPct?: true
    createdAt?: true
  }

  export type DailySettlementCountAggregateInputType = {
    id?: true
    portfolioId?: true
    date?: true
    cash?: true
    positionJson?: true
    positionDays?: true
    totalValue?: true
    returnPct?: true
    createdAt?: true
    _all?: true
  }

  export type DailySettlementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailySettlement to aggregate.
     */
    where?: DailySettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailySettlements to fetch.
     */
    orderBy?: DailySettlementOrderByWithRelationInput | DailySettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailySettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailySettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailySettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailySettlements
    **/
    _count?: true | DailySettlementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailySettlementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailySettlementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailySettlementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailySettlementMaxAggregateInputType
  }

  export type GetDailySettlementAggregateType<T extends DailySettlementAggregateArgs> = {
        [P in keyof T & keyof AggregateDailySettlement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailySettlement[P]>
      : GetScalarType<T[P], AggregateDailySettlement[P]>
  }




  export type DailySettlementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailySettlementWhereInput
    orderBy?: DailySettlementOrderByWithAggregationInput | DailySettlementOrderByWithAggregationInput[]
    by: DailySettlementScalarFieldEnum[] | DailySettlementScalarFieldEnum
    having?: DailySettlementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailySettlementCountAggregateInputType | true
    _avg?: DailySettlementAvgAggregateInputType
    _sum?: DailySettlementSumAggregateInputType
    _min?: DailySettlementMinAggregateInputType
    _max?: DailySettlementMaxAggregateInputType
  }

  export type DailySettlementGroupByOutputType = {
    id: string
    portfolioId: string
    date: string
    cash: number
    positionJson: string | null
    positionDays: number
    totalValue: number
    returnPct: number
    createdAt: Date
    _count: DailySettlementCountAggregateOutputType | null
    _avg: DailySettlementAvgAggregateOutputType | null
    _sum: DailySettlementSumAggregateOutputType | null
    _min: DailySettlementMinAggregateOutputType | null
    _max: DailySettlementMaxAggregateOutputType | null
  }

  type GetDailySettlementGroupByPayload<T extends DailySettlementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailySettlementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailySettlementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailySettlementGroupByOutputType[P]>
            : GetScalarType<T[P], DailySettlementGroupByOutputType[P]>
        }
      >
    >


  export type DailySettlementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    date?: boolean
    cash?: boolean
    positionJson?: boolean
    positionDays?: boolean
    totalValue?: boolean
    returnPct?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailySettlement"]>

  export type DailySettlementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    date?: boolean
    cash?: boolean
    positionJson?: boolean
    positionDays?: boolean
    totalValue?: boolean
    returnPct?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailySettlement"]>

  export type DailySettlementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    date?: boolean
    cash?: boolean
    positionJson?: boolean
    positionDays?: boolean
    totalValue?: boolean
    returnPct?: boolean
    createdAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailySettlement"]>

  export type DailySettlementSelectScalar = {
    id?: boolean
    portfolioId?: boolean
    date?: boolean
    cash?: boolean
    positionJson?: boolean
    positionDays?: boolean
    totalValue?: boolean
    returnPct?: boolean
    createdAt?: boolean
  }

  export type DailySettlementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "portfolioId" | "date" | "cash" | "positionJson" | "positionDays" | "totalValue" | "returnPct" | "createdAt", ExtArgs["result"]["dailySettlement"]>
  export type DailySettlementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type DailySettlementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type DailySettlementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }

  export type $DailySettlementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailySettlement"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      portfolioId: string
      date: string
      cash: number
      positionJson: string | null
      positionDays: number
      totalValue: number
      returnPct: number
      createdAt: Date
    }, ExtArgs["result"]["dailySettlement"]>
    composites: {}
  }

  type DailySettlementGetPayload<S extends boolean | null | undefined | DailySettlementDefaultArgs> = $Result.GetResult<Prisma.$DailySettlementPayload, S>

  type DailySettlementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailySettlementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailySettlementCountAggregateInputType | true
    }

  export interface DailySettlementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailySettlement'], meta: { name: 'DailySettlement' } }
    /**
     * Find zero or one DailySettlement that matches the filter.
     * @param {DailySettlementFindUniqueArgs} args - Arguments to find a DailySettlement
     * @example
     * // Get one DailySettlement
     * const dailySettlement = await prisma.dailySettlement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailySettlementFindUniqueArgs>(args: SelectSubset<T, DailySettlementFindUniqueArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailySettlement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailySettlementFindUniqueOrThrowArgs} args - Arguments to find a DailySettlement
     * @example
     * // Get one DailySettlement
     * const dailySettlement = await prisma.dailySettlement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailySettlementFindUniqueOrThrowArgs>(args: SelectSubset<T, DailySettlementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailySettlement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailySettlementFindFirstArgs} args - Arguments to find a DailySettlement
     * @example
     * // Get one DailySettlement
     * const dailySettlement = await prisma.dailySettlement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailySettlementFindFirstArgs>(args?: SelectSubset<T, DailySettlementFindFirstArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailySettlement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailySettlementFindFirstOrThrowArgs} args - Arguments to find a DailySettlement
     * @example
     * // Get one DailySettlement
     * const dailySettlement = await prisma.dailySettlement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailySettlementFindFirstOrThrowArgs>(args?: SelectSubset<T, DailySettlementFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailySettlements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailySettlementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailySettlements
     * const dailySettlements = await prisma.dailySettlement.findMany()
     * 
     * // Get first 10 DailySettlements
     * const dailySettlements = await prisma.dailySettlement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailySettlementWithIdOnly = await prisma.dailySettlement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailySettlementFindManyArgs>(args?: SelectSubset<T, DailySettlementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailySettlement.
     * @param {DailySettlementCreateArgs} args - Arguments to create a DailySettlement.
     * @example
     * // Create one DailySettlement
     * const DailySettlement = await prisma.dailySettlement.create({
     *   data: {
     *     // ... data to create a DailySettlement
     *   }
     * })
     * 
     */
    create<T extends DailySettlementCreateArgs>(args: SelectSubset<T, DailySettlementCreateArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailySettlements.
     * @param {DailySettlementCreateManyArgs} args - Arguments to create many DailySettlements.
     * @example
     * // Create many DailySettlements
     * const dailySettlement = await prisma.dailySettlement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailySettlementCreateManyArgs>(args?: SelectSubset<T, DailySettlementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailySettlements and returns the data saved in the database.
     * @param {DailySettlementCreateManyAndReturnArgs} args - Arguments to create many DailySettlements.
     * @example
     * // Create many DailySettlements
     * const dailySettlement = await prisma.dailySettlement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailySettlements and only return the `id`
     * const dailySettlementWithIdOnly = await prisma.dailySettlement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailySettlementCreateManyAndReturnArgs>(args?: SelectSubset<T, DailySettlementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailySettlement.
     * @param {DailySettlementDeleteArgs} args - Arguments to delete one DailySettlement.
     * @example
     * // Delete one DailySettlement
     * const DailySettlement = await prisma.dailySettlement.delete({
     *   where: {
     *     // ... filter to delete one DailySettlement
     *   }
     * })
     * 
     */
    delete<T extends DailySettlementDeleteArgs>(args: SelectSubset<T, DailySettlementDeleteArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailySettlement.
     * @param {DailySettlementUpdateArgs} args - Arguments to update one DailySettlement.
     * @example
     * // Update one DailySettlement
     * const dailySettlement = await prisma.dailySettlement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailySettlementUpdateArgs>(args: SelectSubset<T, DailySettlementUpdateArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailySettlements.
     * @param {DailySettlementDeleteManyArgs} args - Arguments to filter DailySettlements to delete.
     * @example
     * // Delete a few DailySettlements
     * const { count } = await prisma.dailySettlement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailySettlementDeleteManyArgs>(args?: SelectSubset<T, DailySettlementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailySettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailySettlementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailySettlements
     * const dailySettlement = await prisma.dailySettlement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailySettlementUpdateManyArgs>(args: SelectSubset<T, DailySettlementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailySettlements and returns the data updated in the database.
     * @param {DailySettlementUpdateManyAndReturnArgs} args - Arguments to update many DailySettlements.
     * @example
     * // Update many DailySettlements
     * const dailySettlement = await prisma.dailySettlement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailySettlements and only return the `id`
     * const dailySettlementWithIdOnly = await prisma.dailySettlement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailySettlementUpdateManyAndReturnArgs>(args: SelectSubset<T, DailySettlementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailySettlement.
     * @param {DailySettlementUpsertArgs} args - Arguments to update or create a DailySettlement.
     * @example
     * // Update or create a DailySettlement
     * const dailySettlement = await prisma.dailySettlement.upsert({
     *   create: {
     *     // ... data to create a DailySettlement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailySettlement we want to update
     *   }
     * })
     */
    upsert<T extends DailySettlementUpsertArgs>(args: SelectSubset<T, DailySettlementUpsertArgs<ExtArgs>>): Prisma__DailySettlementClient<$Result.GetResult<Prisma.$DailySettlementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailySettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailySettlementCountArgs} args - Arguments to filter DailySettlements to count.
     * @example
     * // Count the number of DailySettlements
     * const count = await prisma.dailySettlement.count({
     *   where: {
     *     // ... the filter for the DailySettlements we want to count
     *   }
     * })
    **/
    count<T extends DailySettlementCountArgs>(
      args?: Subset<T, DailySettlementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailySettlementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailySettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailySettlementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailySettlementAggregateArgs>(args: Subset<T, DailySettlementAggregateArgs>): Prisma.PrismaPromise<GetDailySettlementAggregateType<T>>

    /**
     * Group by DailySettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailySettlementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailySettlementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailySettlementGroupByArgs['orderBy'] }
        : { orderBy?: DailySettlementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailySettlementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailySettlementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailySettlement model
   */
  readonly fields: DailySettlementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailySettlement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailySettlementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailySettlement model
   */
  interface DailySettlementFieldRefs {
    readonly id: FieldRef<"DailySettlement", 'String'>
    readonly portfolioId: FieldRef<"DailySettlement", 'String'>
    readonly date: FieldRef<"DailySettlement", 'String'>
    readonly cash: FieldRef<"DailySettlement", 'Float'>
    readonly positionJson: FieldRef<"DailySettlement", 'String'>
    readonly positionDays: FieldRef<"DailySettlement", 'Int'>
    readonly totalValue: FieldRef<"DailySettlement", 'Float'>
    readonly returnPct: FieldRef<"DailySettlement", 'Float'>
    readonly createdAt: FieldRef<"DailySettlement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailySettlement findUnique
   */
  export type DailySettlementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * Filter, which DailySettlement to fetch.
     */
    where: DailySettlementWhereUniqueInput
  }

  /**
   * DailySettlement findUniqueOrThrow
   */
  export type DailySettlementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * Filter, which DailySettlement to fetch.
     */
    where: DailySettlementWhereUniqueInput
  }

  /**
   * DailySettlement findFirst
   */
  export type DailySettlementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * Filter, which DailySettlement to fetch.
     */
    where?: DailySettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailySettlements to fetch.
     */
    orderBy?: DailySettlementOrderByWithRelationInput | DailySettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailySettlements.
     */
    cursor?: DailySettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailySettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailySettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailySettlements.
     */
    distinct?: DailySettlementScalarFieldEnum | DailySettlementScalarFieldEnum[]
  }

  /**
   * DailySettlement findFirstOrThrow
   */
  export type DailySettlementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * Filter, which DailySettlement to fetch.
     */
    where?: DailySettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailySettlements to fetch.
     */
    orderBy?: DailySettlementOrderByWithRelationInput | DailySettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailySettlements.
     */
    cursor?: DailySettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailySettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailySettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailySettlements.
     */
    distinct?: DailySettlementScalarFieldEnum | DailySettlementScalarFieldEnum[]
  }

  /**
   * DailySettlement findMany
   */
  export type DailySettlementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * Filter, which DailySettlements to fetch.
     */
    where?: DailySettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailySettlements to fetch.
     */
    orderBy?: DailySettlementOrderByWithRelationInput | DailySettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailySettlements.
     */
    cursor?: DailySettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailySettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailySettlements.
     */
    skip?: number
    distinct?: DailySettlementScalarFieldEnum | DailySettlementScalarFieldEnum[]
  }

  /**
   * DailySettlement create
   */
  export type DailySettlementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * The data needed to create a DailySettlement.
     */
    data: XOR<DailySettlementCreateInput, DailySettlementUncheckedCreateInput>
  }

  /**
   * DailySettlement createMany
   */
  export type DailySettlementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailySettlements.
     */
    data: DailySettlementCreateManyInput | DailySettlementCreateManyInput[]
  }

  /**
   * DailySettlement createManyAndReturn
   */
  export type DailySettlementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * The data used to create many DailySettlements.
     */
    data: DailySettlementCreateManyInput | DailySettlementCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailySettlement update
   */
  export type DailySettlementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * The data needed to update a DailySettlement.
     */
    data: XOR<DailySettlementUpdateInput, DailySettlementUncheckedUpdateInput>
    /**
     * Choose, which DailySettlement to update.
     */
    where: DailySettlementWhereUniqueInput
  }

  /**
   * DailySettlement updateMany
   */
  export type DailySettlementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailySettlements.
     */
    data: XOR<DailySettlementUpdateManyMutationInput, DailySettlementUncheckedUpdateManyInput>
    /**
     * Filter which DailySettlements to update
     */
    where?: DailySettlementWhereInput
    /**
     * Limit how many DailySettlements to update.
     */
    limit?: number
  }

  /**
   * DailySettlement updateManyAndReturn
   */
  export type DailySettlementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * The data used to update DailySettlements.
     */
    data: XOR<DailySettlementUpdateManyMutationInput, DailySettlementUncheckedUpdateManyInput>
    /**
     * Filter which DailySettlements to update
     */
    where?: DailySettlementWhereInput
    /**
     * Limit how many DailySettlements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailySettlement upsert
   */
  export type DailySettlementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * The filter to search for the DailySettlement to update in case it exists.
     */
    where: DailySettlementWhereUniqueInput
    /**
     * In case the DailySettlement found by the `where` argument doesn't exist, create a new DailySettlement with this data.
     */
    create: XOR<DailySettlementCreateInput, DailySettlementUncheckedCreateInput>
    /**
     * In case the DailySettlement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailySettlementUpdateInput, DailySettlementUncheckedUpdateInput>
  }

  /**
   * DailySettlement delete
   */
  export type DailySettlementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
    /**
     * Filter which DailySettlement to delete.
     */
    where: DailySettlementWhereUniqueInput
  }

  /**
   * DailySettlement deleteMany
   */
  export type DailySettlementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailySettlements to delete
     */
    where?: DailySettlementWhereInput
    /**
     * Limit how many DailySettlements to delete.
     */
    limit?: number
  }

  /**
   * DailySettlement without action
   */
  export type DailySettlementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailySettlement
     */
    select?: DailySettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailySettlement
     */
    omit?: DailySettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailySettlementInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    apiKey: 'apiKey',
    secretHash: 'secretHash',
    status: 'status',
    avatar: 'avatar',
    description: 'description',
    model: 'model',
    market: 'market',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const CompetitionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    startAt: 'startAt',
    endAt: 'endAt',
    initialCash: 'initialCash',
    market: 'market',
    testMode: 'testMode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompetitionScalarFieldEnum = (typeof CompetitionScalarFieldEnum)[keyof typeof CompetitionScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    competitionId: 'competitionId',
    cash: 'cash',
    totalValue: 'totalValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const PositionScalarFieldEnum: {
    id: 'id',
    portfolioId: 'portfolioId',
    symbol: 'symbol',
    quantity: 'quantity',
    avgCost: 'avgCost',
    currentPrice: 'currentPrice',
    boughtAt: 'boughtAt',
    updatedAt: 'updatedAt'
  };

  export type PositionScalarFieldEnum = (typeof PositionScalarFieldEnum)[keyof typeof PositionScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    symbol: 'symbol',
    side: 'side',
    quantity: 'quantity',
    price: 'price',
    status: 'status',
    filledAt: 'filledAt',
    executedPrice: 'executedPrice',
    note: 'note',
    commission: 'commission',
    stampTax: 'stampTax',
    transferFee: 'transferFee',
    netAmount: 'netAmount',
    createdAt: 'createdAt'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const PriceScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    name: 'name',
    price: 'price',
    prevClose: 'prevClose',
    updatedAt: 'updatedAt'
  };

  export type PriceScalarFieldEnum = (typeof PriceScalarFieldEnum)[keyof typeof PriceScalarFieldEnum]


  export const LobsterScalarFieldEnum: {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    color: 'color',
    isActive: 'isActive',
    agentId: 'agentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LobsterScalarFieldEnum = (typeof LobsterScalarFieldEnum)[keyof typeof LobsterScalarFieldEnum]


  export const DeliveryScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    lobsterId: 'lobsterId',
    symbol: 'symbol',
    side: 'side',
    quantity: 'quantity',
    price: 'price',
    deliveredAt: 'deliveredAt',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type DeliveryScalarFieldEnum = (typeof DeliveryScalarFieldEnum)[keyof typeof DeliveryScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    author: 'author',
    content: 'content',
    sentiment: 'sentiment',
    lobsterId: 'lobsterId',
    agentId: 'agentId',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const LogEntryScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    level: 'level',
    lobsterId: 'lobsterId',
    agentId: 'agentId',
    createdAt: 'createdAt'
  };

  export type LogEntryScalarFieldEnum = (typeof LogEntryScalarFieldEnum)[keyof typeof LogEntryScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    competitionId: 'competitionId',
    portfolioId: 'portfolioId',
    symbol: 'symbol',
    side: 'side',
    quantity: 'quantity',
    note: 'note',
    status: 'status',
    rejectReason: 'rejectReason',
    submittedAt: 'submittedAt',
    matchedAt: 'matchedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const DailySettlementScalarFieldEnum: {
    id: 'id',
    portfolioId: 'portfolioId',
    date: 'date',
    cash: 'cash',
    positionJson: 'positionJson',
    positionDays: 'positionDays',
    totalValue: 'totalValue',
    returnPct: 'returnPct',
    createdAt: 'createdAt'
  };

  export type DailySettlementScalarFieldEnum = (typeof DailySettlementScalarFieldEnum)[keyof typeof DailySettlementScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'AgentStatus'
   */
  export type EnumAgentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentStatus'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'CompetitionStatus'
   */
  export type EnumCompetitionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompetitionStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'TradeSide'
   */
  export type EnumTradeSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeSide'>
    


  /**
   * Reference to a field of type 'TradeStatus'
   */
  export type EnumTradeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TradeStatus'>
    


  /**
   * Reference to a field of type 'LobsterKey'
   */
  export type EnumLobsterKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LobsterKey'>
    


  /**
   * Reference to a field of type 'DeliverySide'
   */
  export type EnumDeliverySideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliverySide'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    apiKey?: StringFilter<"Agent"> | string
    secretHash?: StringFilter<"Agent"> | string
    status?: EnumAgentStatusFilter<"Agent"> | $Enums.AgentStatus
    avatar?: StringNullableFilter<"Agent"> | string | null
    description?: StringNullableFilter<"Agent"> | string | null
    model?: StringNullableFilter<"Agent"> | string | null
    market?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    trades?: TradeListRelationFilter
    portfolios?: PortfolioListRelationFilter
    orders?: OrderListRelationFilter
    logs?: LogEntryListRelationFilter
    comments?: CommentListRelationFilter
    deliveries?: DeliveryListRelationFilter
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    apiKey?: SortOrder
    secretHash?: SortOrder
    status?: SortOrder
    avatar?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    market?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trades?: TradeOrderByRelationAggregateInput
    portfolios?: PortfolioOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    logs?: LogEntryOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    deliveries?: DeliveryOrderByRelationAggregateInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    apiKey?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    secretHash?: StringFilter<"Agent"> | string
    status?: EnumAgentStatusFilter<"Agent"> | $Enums.AgentStatus
    avatar?: StringNullableFilter<"Agent"> | string | null
    description?: StringNullableFilter<"Agent"> | string | null
    model?: StringNullableFilter<"Agent"> | string | null
    market?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    trades?: TradeListRelationFilter
    portfolios?: PortfolioListRelationFilter
    orders?: OrderListRelationFilter
    logs?: LogEntryListRelationFilter
    comments?: CommentListRelationFilter
    deliveries?: DeliveryListRelationFilter
  }, "id" | "name" | "apiKey">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    apiKey?: SortOrder
    secretHash?: SortOrder
    status?: SortOrder
    avatar?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    market?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    name?: StringWithAggregatesFilter<"Agent"> | string
    apiKey?: StringWithAggregatesFilter<"Agent"> | string
    secretHash?: StringWithAggregatesFilter<"Agent"> | string
    status?: EnumAgentStatusWithAggregatesFilter<"Agent"> | $Enums.AgentStatus
    avatar?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    description?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    model?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    market?: StringWithAggregatesFilter<"Agent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
  }

  export type CompetitionWhereInput = {
    AND?: CompetitionWhereInput | CompetitionWhereInput[]
    OR?: CompetitionWhereInput[]
    NOT?: CompetitionWhereInput | CompetitionWhereInput[]
    id?: StringFilter<"Competition"> | string
    name?: StringFilter<"Competition"> | string
    description?: StringNullableFilter<"Competition"> | string | null
    status?: EnumCompetitionStatusFilter<"Competition"> | $Enums.CompetitionStatus
    startAt?: DateTimeNullableFilter<"Competition"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Competition"> | Date | string | null
    initialCash?: FloatFilter<"Competition"> | number
    market?: StringFilter<"Competition"> | string
    testMode?: BoolFilter<"Competition"> | boolean
    createdAt?: DateTimeFilter<"Competition"> | Date | string
    updatedAt?: DateTimeFilter<"Competition"> | Date | string
    portfolios?: PortfolioListRelationFilter
    orders?: OrderListRelationFilter
  }

  export type CompetitionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    initialCash?: SortOrder
    market?: SortOrder
    testMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    portfolios?: PortfolioOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type CompetitionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompetitionWhereInput | CompetitionWhereInput[]
    OR?: CompetitionWhereInput[]
    NOT?: CompetitionWhereInput | CompetitionWhereInput[]
    name?: StringFilter<"Competition"> | string
    description?: StringNullableFilter<"Competition"> | string | null
    status?: EnumCompetitionStatusFilter<"Competition"> | $Enums.CompetitionStatus
    startAt?: DateTimeNullableFilter<"Competition"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Competition"> | Date | string | null
    initialCash?: FloatFilter<"Competition"> | number
    market?: StringFilter<"Competition"> | string
    testMode?: BoolFilter<"Competition"> | boolean
    createdAt?: DateTimeFilter<"Competition"> | Date | string
    updatedAt?: DateTimeFilter<"Competition"> | Date | string
    portfolios?: PortfolioListRelationFilter
    orders?: OrderListRelationFilter
  }, "id">

  export type CompetitionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    initialCash?: SortOrder
    market?: SortOrder
    testMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompetitionCountOrderByAggregateInput
    _avg?: CompetitionAvgOrderByAggregateInput
    _max?: CompetitionMaxOrderByAggregateInput
    _min?: CompetitionMinOrderByAggregateInput
    _sum?: CompetitionSumOrderByAggregateInput
  }

  export type CompetitionScalarWhereWithAggregatesInput = {
    AND?: CompetitionScalarWhereWithAggregatesInput | CompetitionScalarWhereWithAggregatesInput[]
    OR?: CompetitionScalarWhereWithAggregatesInput[]
    NOT?: CompetitionScalarWhereWithAggregatesInput | CompetitionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Competition"> | string
    name?: StringWithAggregatesFilter<"Competition"> | string
    description?: StringNullableWithAggregatesFilter<"Competition"> | string | null
    status?: EnumCompetitionStatusWithAggregatesFilter<"Competition"> | $Enums.CompetitionStatus
    startAt?: DateTimeNullableWithAggregatesFilter<"Competition"> | Date | string | null
    endAt?: DateTimeNullableWithAggregatesFilter<"Competition"> | Date | string | null
    initialCash?: FloatWithAggregatesFilter<"Competition"> | number
    market?: StringWithAggregatesFilter<"Competition"> | string
    testMode?: BoolWithAggregatesFilter<"Competition"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Competition"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Competition"> | Date | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    agentId?: StringFilter<"Portfolio"> | string
    competitionId?: StringFilter<"Portfolio"> | string
    cash?: FloatFilter<"Portfolio"> | number
    totalValue?: FloatFilter<"Portfolio"> | number
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    competition?: XOR<CompetitionScalarRelationFilter, CompetitionWhereInput>
    positions?: PositionListRelationFilter
    orders?: OrderListRelationFilter
    settlements?: DailySettlementListRelationFilter
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    cash?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    competition?: CompetitionOrderByWithRelationInput
    positions?: PositionOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    settlements?: DailySettlementOrderByRelationAggregateInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId_competitionId?: PortfolioAgentIdCompetitionIdCompoundUniqueInput
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    agentId?: StringFilter<"Portfolio"> | string
    competitionId?: StringFilter<"Portfolio"> | string
    cash?: FloatFilter<"Portfolio"> | number
    totalValue?: FloatFilter<"Portfolio"> | number
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    competition?: XOR<CompetitionScalarRelationFilter, CompetitionWhereInput>
    positions?: PositionListRelationFilter
    orders?: OrderListRelationFilter
    settlements?: DailySettlementListRelationFilter
  }, "id" | "agentId_competitionId">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    cash?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _avg?: PortfolioAvgOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
    _sum?: PortfolioSumOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Portfolio"> | string
    agentId?: StringWithAggregatesFilter<"Portfolio"> | string
    competitionId?: StringWithAggregatesFilter<"Portfolio"> | string
    cash?: FloatWithAggregatesFilter<"Portfolio"> | number
    totalValue?: FloatWithAggregatesFilter<"Portfolio"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
  }

  export type PositionWhereInput = {
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    id?: StringFilter<"Position"> | string
    portfolioId?: StringFilter<"Position"> | string
    symbol?: StringFilter<"Position"> | string
    quantity?: FloatFilter<"Position"> | number
    avgCost?: FloatFilter<"Position"> | number
    currentPrice?: FloatNullableFilter<"Position"> | number | null
    boughtAt?: DateTimeFilter<"Position"> | Date | string
    updatedAt?: DateTimeFilter<"Position"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }

  export type PositionOrderByWithRelationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
    currentPrice?: SortOrderInput | SortOrder
    boughtAt?: SortOrder
    updatedAt?: SortOrder
    portfolio?: PortfolioOrderByWithRelationInput
  }

  export type PositionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    portfolioId_symbol?: PositionPortfolioIdSymbolCompoundUniqueInput
    AND?: PositionWhereInput | PositionWhereInput[]
    OR?: PositionWhereInput[]
    NOT?: PositionWhereInput | PositionWhereInput[]
    portfolioId?: StringFilter<"Position"> | string
    symbol?: StringFilter<"Position"> | string
    quantity?: FloatFilter<"Position"> | number
    avgCost?: FloatFilter<"Position"> | number
    currentPrice?: FloatNullableFilter<"Position"> | number | null
    boughtAt?: DateTimeFilter<"Position"> | Date | string
    updatedAt?: DateTimeFilter<"Position"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }, "id" | "portfolioId_symbol">

  export type PositionOrderByWithAggregationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
    currentPrice?: SortOrderInput | SortOrder
    boughtAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PositionCountOrderByAggregateInput
    _avg?: PositionAvgOrderByAggregateInput
    _max?: PositionMaxOrderByAggregateInput
    _min?: PositionMinOrderByAggregateInput
    _sum?: PositionSumOrderByAggregateInput
  }

  export type PositionScalarWhereWithAggregatesInput = {
    AND?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    OR?: PositionScalarWhereWithAggregatesInput[]
    NOT?: PositionScalarWhereWithAggregatesInput | PositionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Position"> | string
    portfolioId?: StringWithAggregatesFilter<"Position"> | string
    symbol?: StringWithAggregatesFilter<"Position"> | string
    quantity?: FloatWithAggregatesFilter<"Position"> | number
    avgCost?: FloatWithAggregatesFilter<"Position"> | number
    currentPrice?: FloatNullableWithAggregatesFilter<"Position"> | number | null
    boughtAt?: DateTimeWithAggregatesFilter<"Position"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Position"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: StringFilter<"Trade"> | string
    agentId?: StringFilter<"Trade"> | string
    symbol?: StringFilter<"Trade"> | string
    side?: EnumTradeSideFilter<"Trade"> | $Enums.TradeSide
    quantity?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    status?: EnumTradeStatusFilter<"Trade"> | $Enums.TradeStatus
    filledAt?: DateTimeNullableFilter<"Trade"> | Date | string | null
    executedPrice?: FloatNullableFilter<"Trade"> | number | null
    note?: StringNullableFilter<"Trade"> | string | null
    commission?: FloatNullableFilter<"Trade"> | number | null
    stampTax?: FloatNullableFilter<"Trade"> | number | null
    transferFee?: FloatNullableFilter<"Trade"> | number | null
    netAmount?: FloatNullableFilter<"Trade"> | number | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    status?: SortOrder
    filledAt?: SortOrderInput | SortOrder
    executedPrice?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    commission?: SortOrderInput | SortOrder
    stampTax?: SortOrderInput | SortOrder
    transferFee?: SortOrderInput | SortOrder
    netAmount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    agentId?: StringFilter<"Trade"> | string
    symbol?: StringFilter<"Trade"> | string
    side?: EnumTradeSideFilter<"Trade"> | $Enums.TradeSide
    quantity?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    status?: EnumTradeStatusFilter<"Trade"> | $Enums.TradeStatus
    filledAt?: DateTimeNullableFilter<"Trade"> | Date | string | null
    executedPrice?: FloatNullableFilter<"Trade"> | number | null
    note?: StringNullableFilter<"Trade"> | string | null
    commission?: FloatNullableFilter<"Trade"> | number | null
    stampTax?: FloatNullableFilter<"Trade"> | number | null
    transferFee?: FloatNullableFilter<"Trade"> | number | null
    netAmount?: FloatNullableFilter<"Trade"> | number | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    status?: SortOrder
    filledAt?: SortOrderInput | SortOrder
    executedPrice?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    commission?: SortOrderInput | SortOrder
    stampTax?: SortOrderInput | SortOrder
    transferFee?: SortOrderInput | SortOrder
    netAmount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade"> | string
    agentId?: StringWithAggregatesFilter<"Trade"> | string
    symbol?: StringWithAggregatesFilter<"Trade"> | string
    side?: EnumTradeSideWithAggregatesFilter<"Trade"> | $Enums.TradeSide
    quantity?: FloatWithAggregatesFilter<"Trade"> | number
    price?: FloatWithAggregatesFilter<"Trade"> | number
    status?: EnumTradeStatusWithAggregatesFilter<"Trade"> | $Enums.TradeStatus
    filledAt?: DateTimeNullableWithAggregatesFilter<"Trade"> | Date | string | null
    executedPrice?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    note?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    commission?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    stampTax?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    transferFee?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    netAmount?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type PriceWhereInput = {
    AND?: PriceWhereInput | PriceWhereInput[]
    OR?: PriceWhereInput[]
    NOT?: PriceWhereInput | PriceWhereInput[]
    id?: StringFilter<"Price"> | string
    symbol?: StringFilter<"Price"> | string
    name?: StringNullableFilter<"Price"> | string | null
    price?: FloatFilter<"Price"> | number
    prevClose?: FloatFilter<"Price"> | number
    updatedAt?: DateTimeFilter<"Price"> | Date | string
  }

  export type PriceOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrderInput | SortOrder
    price?: SortOrder
    prevClose?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    symbol?: string
    AND?: PriceWhereInput | PriceWhereInput[]
    OR?: PriceWhereInput[]
    NOT?: PriceWhereInput | PriceWhereInput[]
    name?: StringNullableFilter<"Price"> | string | null
    price?: FloatFilter<"Price"> | number
    prevClose?: FloatFilter<"Price"> | number
    updatedAt?: DateTimeFilter<"Price"> | Date | string
  }, "id" | "symbol">

  export type PriceOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrderInput | SortOrder
    price?: SortOrder
    prevClose?: SortOrder
    updatedAt?: SortOrder
    _count?: PriceCountOrderByAggregateInput
    _avg?: PriceAvgOrderByAggregateInput
    _max?: PriceMaxOrderByAggregateInput
    _min?: PriceMinOrderByAggregateInput
    _sum?: PriceSumOrderByAggregateInput
  }

  export type PriceScalarWhereWithAggregatesInput = {
    AND?: PriceScalarWhereWithAggregatesInput | PriceScalarWhereWithAggregatesInput[]
    OR?: PriceScalarWhereWithAggregatesInput[]
    NOT?: PriceScalarWhereWithAggregatesInput | PriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Price"> | string
    symbol?: StringWithAggregatesFilter<"Price"> | string
    name?: StringNullableWithAggregatesFilter<"Price"> | string | null
    price?: FloatWithAggregatesFilter<"Price"> | number
    prevClose?: FloatWithAggregatesFilter<"Price"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"Price"> | Date | string
  }

  export type LobsterWhereInput = {
    AND?: LobsterWhereInput | LobsterWhereInput[]
    OR?: LobsterWhereInput[]
    NOT?: LobsterWhereInput | LobsterWhereInput[]
    id?: StringFilter<"Lobster"> | string
    key?: EnumLobsterKeyFilter<"Lobster"> | $Enums.LobsterKey
    name?: StringFilter<"Lobster"> | string
    description?: StringNullableFilter<"Lobster"> | string | null
    color?: StringNullableFilter<"Lobster"> | string | null
    isActive?: BoolFilter<"Lobster"> | boolean
    agentId?: StringNullableFilter<"Lobster"> | string | null
    createdAt?: DateTimeFilter<"Lobster"> | Date | string
    updatedAt?: DateTimeFilter<"Lobster"> | Date | string
    deliveries?: DeliveryListRelationFilter
    comments?: CommentListRelationFilter
    logs?: LogEntryListRelationFilter
  }

  export type LobsterOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isActive?: SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deliveries?: DeliveryOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    logs?: LogEntryOrderByRelationAggregateInput
  }

  export type LobsterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: $Enums.LobsterKey
    agentId?: string
    AND?: LobsterWhereInput | LobsterWhereInput[]
    OR?: LobsterWhereInput[]
    NOT?: LobsterWhereInput | LobsterWhereInput[]
    name?: StringFilter<"Lobster"> | string
    description?: StringNullableFilter<"Lobster"> | string | null
    color?: StringNullableFilter<"Lobster"> | string | null
    isActive?: BoolFilter<"Lobster"> | boolean
    createdAt?: DateTimeFilter<"Lobster"> | Date | string
    updatedAt?: DateTimeFilter<"Lobster"> | Date | string
    deliveries?: DeliveryListRelationFilter
    comments?: CommentListRelationFilter
    logs?: LogEntryListRelationFilter
  }, "id" | "key" | "agentId">

  export type LobsterOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isActive?: SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LobsterCountOrderByAggregateInput
    _max?: LobsterMaxOrderByAggregateInput
    _min?: LobsterMinOrderByAggregateInput
  }

  export type LobsterScalarWhereWithAggregatesInput = {
    AND?: LobsterScalarWhereWithAggregatesInput | LobsterScalarWhereWithAggregatesInput[]
    OR?: LobsterScalarWhereWithAggregatesInput[]
    NOT?: LobsterScalarWhereWithAggregatesInput | LobsterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lobster"> | string
    key?: EnumLobsterKeyWithAggregatesFilter<"Lobster"> | $Enums.LobsterKey
    name?: StringWithAggregatesFilter<"Lobster"> | string
    description?: StringNullableWithAggregatesFilter<"Lobster"> | string | null
    color?: StringNullableWithAggregatesFilter<"Lobster"> | string | null
    isActive?: BoolWithAggregatesFilter<"Lobster"> | boolean
    agentId?: StringNullableWithAggregatesFilter<"Lobster"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lobster"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lobster"> | Date | string
  }

  export type DeliveryWhereInput = {
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    id?: StringFilter<"Delivery"> | string
    agentId?: StringFilter<"Delivery"> | string
    lobsterId?: StringNullableFilter<"Delivery"> | string | null
    symbol?: StringFilter<"Delivery"> | string
    side?: EnumDeliverySideFilter<"Delivery"> | $Enums.DeliverySide
    quantity?: FloatFilter<"Delivery"> | number
    price?: FloatFilter<"Delivery"> | number
    deliveredAt?: DateTimeFilter<"Delivery"> | Date | string
    note?: StringNullableFilter<"Delivery"> | string | null
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    lobster?: XOR<LobsterNullableScalarRelationFilter, LobsterWhereInput> | null
  }

  export type DeliveryOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    lobsterId?: SortOrderInput | SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    deliveredAt?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    lobster?: LobsterOrderByWithRelationInput
  }

  export type DeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    agentId?: StringFilter<"Delivery"> | string
    lobsterId?: StringNullableFilter<"Delivery"> | string | null
    symbol?: StringFilter<"Delivery"> | string
    side?: EnumDeliverySideFilter<"Delivery"> | $Enums.DeliverySide
    quantity?: FloatFilter<"Delivery"> | number
    price?: FloatFilter<"Delivery"> | number
    deliveredAt?: DateTimeFilter<"Delivery"> | Date | string
    note?: StringNullableFilter<"Delivery"> | string | null
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    lobster?: XOR<LobsterNullableScalarRelationFilter, LobsterWhereInput> | null
  }, "id">

  export type DeliveryOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    lobsterId?: SortOrderInput | SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    deliveredAt?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DeliveryCountOrderByAggregateInput
    _avg?: DeliveryAvgOrderByAggregateInput
    _max?: DeliveryMaxOrderByAggregateInput
    _min?: DeliveryMinOrderByAggregateInput
    _sum?: DeliverySumOrderByAggregateInput
  }

  export type DeliveryScalarWhereWithAggregatesInput = {
    AND?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    OR?: DeliveryScalarWhereWithAggregatesInput[]
    NOT?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Delivery"> | string
    agentId?: StringWithAggregatesFilter<"Delivery"> | string
    lobsterId?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    symbol?: StringWithAggregatesFilter<"Delivery"> | string
    side?: EnumDeliverySideWithAggregatesFilter<"Delivery"> | $Enums.DeliverySide
    quantity?: FloatWithAggregatesFilter<"Delivery"> | number
    price?: FloatWithAggregatesFilter<"Delivery"> | number
    deliveredAt?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
    note?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    author?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    sentiment?: IntNullableFilter<"Comment"> | number | null
    lobsterId?: StringNullableFilter<"Comment"> | string | null
    agentId?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    lobster?: XOR<LobsterNullableScalarRelationFilter, LobsterWhereInput> | null
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    author?: SortOrder
    content?: SortOrder
    sentiment?: SortOrderInput | SortOrder
    lobsterId?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lobster?: LobsterOrderByWithRelationInput
    agent?: AgentOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    author?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    sentiment?: IntNullableFilter<"Comment"> | number | null
    lobsterId?: StringNullableFilter<"Comment"> | string | null
    agentId?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    lobster?: XOR<LobsterNullableScalarRelationFilter, LobsterWhereInput> | null
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    author?: SortOrder
    content?: SortOrder
    sentiment?: SortOrderInput | SortOrder
    lobsterId?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    author?: StringWithAggregatesFilter<"Comment"> | string
    content?: StringWithAggregatesFilter<"Comment"> | string
    sentiment?: IntNullableWithAggregatesFilter<"Comment"> | number | null
    lobsterId?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    agentId?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type LogEntryWhereInput = {
    AND?: LogEntryWhereInput | LogEntryWhereInput[]
    OR?: LogEntryWhereInput[]
    NOT?: LogEntryWhereInput | LogEntryWhereInput[]
    id?: StringFilter<"LogEntry"> | string
    title?: StringFilter<"LogEntry"> | string
    content?: StringFilter<"LogEntry"> | string
    level?: StringFilter<"LogEntry"> | string
    lobsterId?: StringNullableFilter<"LogEntry"> | string | null
    agentId?: StringNullableFilter<"LogEntry"> | string | null
    createdAt?: DateTimeFilter<"LogEntry"> | Date | string
    lobster?: XOR<LobsterNullableScalarRelationFilter, LobsterWhereInput> | null
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
  }

  export type LogEntryOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    level?: SortOrder
    lobsterId?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lobster?: LobsterOrderByWithRelationInput
    agent?: AgentOrderByWithRelationInput
  }

  export type LogEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LogEntryWhereInput | LogEntryWhereInput[]
    OR?: LogEntryWhereInput[]
    NOT?: LogEntryWhereInput | LogEntryWhereInput[]
    title?: StringFilter<"LogEntry"> | string
    content?: StringFilter<"LogEntry"> | string
    level?: StringFilter<"LogEntry"> | string
    lobsterId?: StringNullableFilter<"LogEntry"> | string | null
    agentId?: StringNullableFilter<"LogEntry"> | string | null
    createdAt?: DateTimeFilter<"LogEntry"> | Date | string
    lobster?: XOR<LobsterNullableScalarRelationFilter, LobsterWhereInput> | null
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
  }, "id">

  export type LogEntryOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    level?: SortOrder
    lobsterId?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LogEntryCountOrderByAggregateInput
    _max?: LogEntryMaxOrderByAggregateInput
    _min?: LogEntryMinOrderByAggregateInput
  }

  export type LogEntryScalarWhereWithAggregatesInput = {
    AND?: LogEntryScalarWhereWithAggregatesInput | LogEntryScalarWhereWithAggregatesInput[]
    OR?: LogEntryScalarWhereWithAggregatesInput[]
    NOT?: LogEntryScalarWhereWithAggregatesInput | LogEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LogEntry"> | string
    title?: StringWithAggregatesFilter<"LogEntry"> | string
    content?: StringWithAggregatesFilter<"LogEntry"> | string
    level?: StringWithAggregatesFilter<"LogEntry"> | string
    lobsterId?: StringNullableWithAggregatesFilter<"LogEntry"> | string | null
    agentId?: StringNullableWithAggregatesFilter<"LogEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LogEntry"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    agentId?: StringFilter<"Order"> | string
    competitionId?: StringFilter<"Order"> | string
    portfolioId?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    side?: EnumTradeSideFilter<"Order"> | $Enums.TradeSide
    quantity?: FloatFilter<"Order"> | number
    note?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    rejectReason?: StringNullableFilter<"Order"> | string | null
    submittedAt?: DateTimeFilter<"Order"> | Date | string
    matchedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    competition?: XOR<CompetitionScalarRelationFilter, CompetitionWhereInput>
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    matchedAt?: SortOrderInput | SortOrder
    agent?: AgentOrderByWithRelationInput
    competition?: CompetitionOrderByWithRelationInput
    portfolio?: PortfolioOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    agentId?: StringFilter<"Order"> | string
    competitionId?: StringFilter<"Order"> | string
    portfolioId?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    side?: EnumTradeSideFilter<"Order"> | $Enums.TradeSide
    quantity?: FloatFilter<"Order"> | number
    note?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    rejectReason?: StringNullableFilter<"Order"> | string | null
    submittedAt?: DateTimeFilter<"Order"> | Date | string
    matchedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    competition?: XOR<CompetitionScalarRelationFilter, CompetitionWhereInput>
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    rejectReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    matchedAt?: SortOrderInput | SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    agentId?: StringWithAggregatesFilter<"Order"> | string
    competitionId?: StringWithAggregatesFilter<"Order"> | string
    portfolioId?: StringWithAggregatesFilter<"Order"> | string
    symbol?: StringWithAggregatesFilter<"Order"> | string
    side?: EnumTradeSideWithAggregatesFilter<"Order"> | $Enums.TradeSide
    quantity?: FloatWithAggregatesFilter<"Order"> | number
    note?: StringNullableWithAggregatesFilter<"Order"> | string | null
    status?: StringWithAggregatesFilter<"Order"> | string
    rejectReason?: StringNullableWithAggregatesFilter<"Order"> | string | null
    submittedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    matchedAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
  }

  export type DailySettlementWhereInput = {
    AND?: DailySettlementWhereInput | DailySettlementWhereInput[]
    OR?: DailySettlementWhereInput[]
    NOT?: DailySettlementWhereInput | DailySettlementWhereInput[]
    id?: StringFilter<"DailySettlement"> | string
    portfolioId?: StringFilter<"DailySettlement"> | string
    date?: StringFilter<"DailySettlement"> | string
    cash?: FloatFilter<"DailySettlement"> | number
    positionJson?: StringNullableFilter<"DailySettlement"> | string | null
    positionDays?: IntFilter<"DailySettlement"> | number
    totalValue?: FloatFilter<"DailySettlement"> | number
    returnPct?: FloatFilter<"DailySettlement"> | number
    createdAt?: DateTimeFilter<"DailySettlement"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }

  export type DailySettlementOrderByWithRelationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    date?: SortOrder
    cash?: SortOrder
    positionJson?: SortOrderInput | SortOrder
    positionDays?: SortOrder
    totalValue?: SortOrder
    returnPct?: SortOrder
    createdAt?: SortOrder
    portfolio?: PortfolioOrderByWithRelationInput
  }

  export type DailySettlementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    portfolioId_date?: DailySettlementPortfolioIdDateCompoundUniqueInput
    AND?: DailySettlementWhereInput | DailySettlementWhereInput[]
    OR?: DailySettlementWhereInput[]
    NOT?: DailySettlementWhereInput | DailySettlementWhereInput[]
    portfolioId?: StringFilter<"DailySettlement"> | string
    date?: StringFilter<"DailySettlement"> | string
    cash?: FloatFilter<"DailySettlement"> | number
    positionJson?: StringNullableFilter<"DailySettlement"> | string | null
    positionDays?: IntFilter<"DailySettlement"> | number
    totalValue?: FloatFilter<"DailySettlement"> | number
    returnPct?: FloatFilter<"DailySettlement"> | number
    createdAt?: DateTimeFilter<"DailySettlement"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }, "id" | "portfolioId_date">

  export type DailySettlementOrderByWithAggregationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    date?: SortOrder
    cash?: SortOrder
    positionJson?: SortOrderInput | SortOrder
    positionDays?: SortOrder
    totalValue?: SortOrder
    returnPct?: SortOrder
    createdAt?: SortOrder
    _count?: DailySettlementCountOrderByAggregateInput
    _avg?: DailySettlementAvgOrderByAggregateInput
    _max?: DailySettlementMaxOrderByAggregateInput
    _min?: DailySettlementMinOrderByAggregateInput
    _sum?: DailySettlementSumOrderByAggregateInput
  }

  export type DailySettlementScalarWhereWithAggregatesInput = {
    AND?: DailySettlementScalarWhereWithAggregatesInput | DailySettlementScalarWhereWithAggregatesInput[]
    OR?: DailySettlementScalarWhereWithAggregatesInput[]
    NOT?: DailySettlementScalarWhereWithAggregatesInput | DailySettlementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailySettlement"> | string
    portfolioId?: StringWithAggregatesFilter<"DailySettlement"> | string
    date?: StringWithAggregatesFilter<"DailySettlement"> | string
    cash?: FloatWithAggregatesFilter<"DailySettlement"> | number
    positionJson?: StringNullableWithAggregatesFilter<"DailySettlement"> | string | null
    positionDays?: IntWithAggregatesFilter<"DailySettlement"> | number
    totalValue?: FloatWithAggregatesFilter<"DailySettlement"> | number
    returnPct?: FloatWithAggregatesFilter<"DailySettlement"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DailySettlement"> | Date | string
  }

  export type AgentCreateInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioCreateNestedManyWithoutAgentInput
    orders?: OrderCreateNestedManyWithoutAgentInput
    logs?: LogEntryCreateNestedManyWithoutAgentInput
    comments?: CommentCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutAgentInput
    orders?: OrderUncheckedCreateNestedManyWithoutAgentInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutAgentInput
    comments?: CommentUncheckedCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUpdateManyWithoutAgentNestedInput
    orders?: OrderUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUpdateManyWithoutAgentNestedInput
    comments?: CommentUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutAgentNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutAgentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateManyInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitionCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CompetitionStatus
    startAt?: Date | string | null
    endAt?: Date | string | null
    initialCash?: number
    market?: string
    testMode?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutCompetitionInput
    orders?: OrderCreateNestedManyWithoutCompetitionInput
  }

  export type CompetitionUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CompetitionStatus
    startAt?: Date | string | null
    endAt?: Date | string | null
    initialCash?: number
    market?: string
    testMode?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutCompetitionInput
    orders?: OrderUncheckedCreateNestedManyWithoutCompetitionInput
  }

  export type CompetitionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutCompetitionNestedInput
    orders?: OrderUpdateManyWithoutCompetitionNestedInput
  }

  export type CompetitionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutCompetitionNestedInput
    orders?: OrderUncheckedUpdateManyWithoutCompetitionNestedInput
  }

  export type CompetitionCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CompetitionStatus
    startAt?: Date | string | null
    endAt?: Date | string | null
    initialCash?: number
    market?: string
    testMode?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompetitionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateInput = {
    id?: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPortfoliosInput
    competition: CompetitionCreateNestedOneWithoutPortfoliosInput
    positions?: PositionCreateNestedManyWithoutPortfolioInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    agentId: string
    competitionId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutPortfolioInput
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPortfoliosNestedInput
    competition?: CompetitionUpdateOneRequiredWithoutPortfoliosNestedInput
    positions?: PositionUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioCreateManyInput = {
    id?: string
    agentId: string
    competitionId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionCreateInput = {
    id?: string
    symbol: string
    quantity: number
    avgCost: number
    currentPrice?: number | null
    boughtAt?: Date | string
    updatedAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutPositionsInput
  }

  export type PositionUncheckedCreateInput = {
    id?: string
    portfolioId: string
    symbol: string
    quantity: number
    avgCost: number
    currentPrice?: number | null
    boughtAt?: Date | string
    updatedAt?: Date | string
  }

  export type PositionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    avgCost?: FloatFieldUpdateOperationsInput | number
    currentPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    boughtAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutPositionsNestedInput
  }

  export type PositionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    avgCost?: FloatFieldUpdateOperationsInput | number
    currentPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    boughtAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionCreateManyInput = {
    id?: string
    portfolioId: string
    symbol: string
    quantity: number
    avgCost: number
    currentPrice?: number | null
    boughtAt?: Date | string
    updatedAt?: Date | string
  }

  export type PositionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    avgCost?: FloatFieldUpdateOperationsInput | number
    currentPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    boughtAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    avgCost?: FloatFieldUpdateOperationsInput | number
    currentPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    boughtAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    price: number
    status?: $Enums.TradeStatus
    filledAt?: Date | string | null
    executedPrice?: number | null
    note?: string | null
    commission?: number | null
    stampTax?: number | null
    transferFee?: number | null
    netAmount?: number | null
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateInput = {
    id?: string
    agentId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    price: number
    status?: $Enums.TradeStatus
    filledAt?: Date | string | null
    executedPrice?: number | null
    note?: string | null
    commission?: number | null
    stampTax?: number | null
    transferFee?: number | null
    netAmount?: number | null
    createdAt?: Date | string
  }

  export type TradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    commission?: NullableFloatFieldUpdateOperationsInput | number | null
    stampTax?: NullableFloatFieldUpdateOperationsInput | number | null
    transferFee?: NullableFloatFieldUpdateOperationsInput | number | null
    netAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    commission?: NullableFloatFieldUpdateOperationsInput | number | null
    stampTax?: NullableFloatFieldUpdateOperationsInput | number | null
    transferFee?: NullableFloatFieldUpdateOperationsInput | number | null
    netAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyInput = {
    id?: string
    agentId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    price: number
    status?: $Enums.TradeStatus
    filledAt?: Date | string | null
    executedPrice?: number | null
    note?: string | null
    commission?: number | null
    stampTax?: number | null
    transferFee?: number | null
    netAmount?: number | null
    createdAt?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    commission?: NullableFloatFieldUpdateOperationsInput | number | null
    stampTax?: NullableFloatFieldUpdateOperationsInput | number | null
    transferFee?: NullableFloatFieldUpdateOperationsInput | number | null
    netAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    commission?: NullableFloatFieldUpdateOperationsInput | number | null
    stampTax?: NullableFloatFieldUpdateOperationsInput | number | null
    transferFee?: NullableFloatFieldUpdateOperationsInput | number | null
    netAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceCreateInput = {
    id?: string
    symbol: string
    name?: string | null
    price: number
    prevClose: number
    updatedAt?: Date | string
  }

  export type PriceUncheckedCreateInput = {
    id?: string
    symbol: string
    name?: string | null
    price: number
    prevClose: number
    updatedAt?: Date | string
  }

  export type PriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    prevClose?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    prevClose?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceCreateManyInput = {
    id?: string
    symbol: string
    name?: string | null
    price: number
    prevClose: number
    updatedAt?: Date | string
  }

  export type PriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    prevClose?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    prevClose?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LobsterCreateInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryCreateNestedManyWithoutLobsterInput
    comments?: CommentCreateNestedManyWithoutLobsterInput
    logs?: LogEntryCreateNestedManyWithoutLobsterInput
  }

  export type LobsterUncheckedCreateInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutLobsterInput
    comments?: CommentUncheckedCreateNestedManyWithoutLobsterInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutLobsterInput
  }

  export type LobsterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUpdateManyWithoutLobsterNestedInput
    comments?: CommentUpdateManyWithoutLobsterNestedInput
    logs?: LogEntryUpdateManyWithoutLobsterNestedInput
  }

  export type LobsterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutLobsterNestedInput
    comments?: CommentUncheckedUpdateManyWithoutLobsterNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutLobsterNestedInput
  }

  export type LobsterCreateManyInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LobsterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LobsterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateInput = {
    id?: string
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutDeliveriesInput
    lobster?: LobsterCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateInput = {
    id?: string
    agentId: string
    lobsterId?: string | null
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
  }

  export type DeliveryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutDeliveriesNestedInput
    lobster?: LobsterUpdateOneWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateManyInput = {
    id?: string
    agentId: string
    lobsterId?: string | null
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
  }

  export type DeliveryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    createdAt?: Date | string
    lobster?: LobsterCreateNestedOneWithoutCommentsInput
    agent?: AgentCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    lobsterId?: string | null
    agentId?: string | null
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lobster?: LobsterUpdateOneWithoutCommentsNestedInput
    agent?: AgentUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    lobsterId?: string | null
    agentId?: string | null
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryCreateInput = {
    id?: string
    title: string
    content: string
    level?: string
    createdAt?: Date | string
    lobster?: LobsterCreateNestedOneWithoutLogsInput
    agent?: AgentCreateNestedOneWithoutLogsInput
  }

  export type LogEntryUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    level?: string
    lobsterId?: string | null
    agentId?: string | null
    createdAt?: Date | string
  }

  export type LogEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lobster?: LobsterUpdateOneWithoutLogsNestedInput
    agent?: AgentUpdateOneWithoutLogsNestedInput
  }

  export type LogEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryCreateManyInput = {
    id?: string
    title: string
    content: string
    level?: string
    lobsterId?: string | null
    agentId?: string | null
    createdAt?: Date | string
  }

  export type LogEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
    agent: AgentCreateNestedOneWithoutOrdersInput
    competition: CompetitionCreateNestedOneWithoutOrdersInput
    portfolio: PortfolioCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    agentId: string
    competitionId: string
    portfolioId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent?: AgentUpdateOneRequiredWithoutOrdersNestedInput
    competition?: CompetitionUpdateOneRequiredWithoutOrdersNestedInput
    portfolio?: PortfolioUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderCreateManyInput = {
    id?: string
    agentId: string
    competitionId: string
    portfolioId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DailySettlementCreateInput = {
    id?: string
    date: string
    cash: number
    positionJson?: string | null
    positionDays?: number
    totalValue: number
    returnPct: number
    createdAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutSettlementsInput
  }

  export type DailySettlementUncheckedCreateInput = {
    id?: string
    portfolioId: string
    date: string
    cash: number
    positionJson?: string | null
    positionDays?: number
    totalValue: number
    returnPct: number
    createdAt?: Date | string
  }

  export type DailySettlementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    positionJson?: NullableStringFieldUpdateOperationsInput | string | null
    positionDays?: IntFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    returnPct?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutSettlementsNestedInput
  }

  export type DailySettlementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    positionJson?: NullableStringFieldUpdateOperationsInput | string | null
    positionDays?: IntFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    returnPct?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailySettlementCreateManyInput = {
    id?: string
    portfolioId: string
    date: string
    cash: number
    positionJson?: string | null
    positionDays?: number
    totalValue: number
    returnPct: number
    createdAt?: Date | string
  }

  export type DailySettlementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    positionJson?: NullableStringFieldUpdateOperationsInput | string | null
    positionDays?: IntFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    returnPct?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailySettlementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    positionJson?: NullableStringFieldUpdateOperationsInput | string | null
    positionDays?: IntFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    returnPct?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumAgentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusFilter<$PrismaModel> | $Enums.AgentStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TradeListRelationFilter = {
    every?: TradeWhereInput
    some?: TradeWhereInput
    none?: TradeWhereInput
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type LogEntryListRelationFilter = {
    every?: LogEntryWhereInput
    some?: LogEntryWhereInput
    none?: LogEntryWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type DeliveryListRelationFilter = {
    every?: DeliveryWhereInput
    some?: DeliveryWhereInput
    none?: DeliveryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LogEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeliveryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    apiKey?: SortOrder
    secretHash?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    description?: SortOrder
    model?: SortOrder
    market?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    apiKey?: SortOrder
    secretHash?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    description?: SortOrder
    model?: SortOrder
    market?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    apiKey?: SortOrder
    secretHash?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    description?: SortOrder
    model?: SortOrder
    market?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAgentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCompetitionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CompetitionStatus | EnumCompetitionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompetitionStatus[]
    notIn?: $Enums.CompetitionStatus[]
    not?: NestedEnumCompetitionStatusFilter<$PrismaModel> | $Enums.CompetitionStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CompetitionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    initialCash?: SortOrder
    market?: SortOrder
    testMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompetitionAvgOrderByAggregateInput = {
    initialCash?: SortOrder
  }

  export type CompetitionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    initialCash?: SortOrder
    market?: SortOrder
    testMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompetitionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    initialCash?: SortOrder
    market?: SortOrder
    testMode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompetitionSumOrderByAggregateInput = {
    initialCash?: SortOrder
  }

  export type EnumCompetitionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompetitionStatus | EnumCompetitionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompetitionStatus[]
    notIn?: $Enums.CompetitionStatus[]
    not?: NestedEnumCompetitionStatusWithAggregatesFilter<$PrismaModel> | $Enums.CompetitionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompetitionStatusFilter<$PrismaModel>
    _max?: NestedEnumCompetitionStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AgentScalarRelationFilter = {
    is?: AgentWhereInput
    isNot?: AgentWhereInput
  }

  export type CompetitionScalarRelationFilter = {
    is?: CompetitionWhereInput
    isNot?: CompetitionWhereInput
  }

  export type PositionListRelationFilter = {
    every?: PositionWhereInput
    some?: PositionWhereInput
    none?: PositionWhereInput
  }

  export type DailySettlementListRelationFilter = {
    every?: DailySettlementWhereInput
    some?: DailySettlementWhereInput
    none?: DailySettlementWhereInput
  }

  export type PositionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailySettlementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioAgentIdCompetitionIdCompoundUniqueInput = {
    agentId: string
    competitionId: string
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    cash?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioAvgOrderByAggregateInput = {
    cash?: SortOrder
    totalValue?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    cash?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    cash?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioSumOrderByAggregateInput = {
    cash?: SortOrder
    totalValue?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PortfolioScalarRelationFilter = {
    is?: PortfolioWhereInput
    isNot?: PortfolioWhereInput
  }

  export type PositionPortfolioIdSymbolCompoundUniqueInput = {
    portfolioId: string
    symbol: string
  }

  export type PositionCountOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
    currentPrice?: SortOrder
    boughtAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PositionAvgOrderByAggregateInput = {
    quantity?: SortOrder
    avgCost?: SortOrder
    currentPrice?: SortOrder
  }

  export type PositionMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
    currentPrice?: SortOrder
    boughtAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PositionMinOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    avgCost?: SortOrder
    currentPrice?: SortOrder
    boughtAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PositionSumOrderByAggregateInput = {
    quantity?: SortOrder
    avgCost?: SortOrder
    currentPrice?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumTradeSideFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeSide | EnumTradeSideFieldRefInput<$PrismaModel>
    in?: $Enums.TradeSide[]
    notIn?: $Enums.TradeSide[]
    not?: NestedEnumTradeSideFilter<$PrismaModel> | $Enums.TradeSide
  }

  export type EnumTradeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[]
    notIn?: $Enums.TradeStatus[]
    not?: NestedEnumTradeStatusFilter<$PrismaModel> | $Enums.TradeStatus
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    status?: SortOrder
    filledAt?: SortOrder
    executedPrice?: SortOrder
    note?: SortOrder
    commission?: SortOrder
    stampTax?: SortOrder
    transferFee?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    executedPrice?: SortOrder
    commission?: SortOrder
    stampTax?: SortOrder
    transferFee?: SortOrder
    netAmount?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    status?: SortOrder
    filledAt?: SortOrder
    executedPrice?: SortOrder
    note?: SortOrder
    commission?: SortOrder
    stampTax?: SortOrder
    transferFee?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    status?: SortOrder
    filledAt?: SortOrder
    executedPrice?: SortOrder
    note?: SortOrder
    commission?: SortOrder
    stampTax?: SortOrder
    transferFee?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    executedPrice?: SortOrder
    commission?: SortOrder
    stampTax?: SortOrder
    transferFee?: SortOrder
    netAmount?: SortOrder
  }

  export type EnumTradeSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeSide | EnumTradeSideFieldRefInput<$PrismaModel>
    in?: $Enums.TradeSide[]
    notIn?: $Enums.TradeSide[]
    not?: NestedEnumTradeSideWithAggregatesFilter<$PrismaModel> | $Enums.TradeSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeSideFilter<$PrismaModel>
    _max?: NestedEnumTradeSideFilter<$PrismaModel>
  }

  export type EnumTradeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[]
    notIn?: $Enums.TradeStatus[]
    not?: NestedEnumTradeStatusWithAggregatesFilter<$PrismaModel> | $Enums.TradeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeStatusFilter<$PrismaModel>
    _max?: NestedEnumTradeStatusFilter<$PrismaModel>
  }

  export type PriceCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    price?: SortOrder
    prevClose?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceAvgOrderByAggregateInput = {
    price?: SortOrder
    prevClose?: SortOrder
  }

  export type PriceMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    price?: SortOrder
    prevClose?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    price?: SortOrder
    prevClose?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceSumOrderByAggregateInput = {
    price?: SortOrder
    prevClose?: SortOrder
  }

  export type EnumLobsterKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.LobsterKey | EnumLobsterKeyFieldRefInput<$PrismaModel>
    in?: $Enums.LobsterKey[]
    notIn?: $Enums.LobsterKey[]
    not?: NestedEnumLobsterKeyFilter<$PrismaModel> | $Enums.LobsterKey
  }

  export type LobsterCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LobsterMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LobsterMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumLobsterKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LobsterKey | EnumLobsterKeyFieldRefInput<$PrismaModel>
    in?: $Enums.LobsterKey[]
    notIn?: $Enums.LobsterKey[]
    not?: NestedEnumLobsterKeyWithAggregatesFilter<$PrismaModel> | $Enums.LobsterKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLobsterKeyFilter<$PrismaModel>
    _max?: NestedEnumLobsterKeyFilter<$PrismaModel>
  }

  export type EnumDeliverySideFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliverySide | EnumDeliverySideFieldRefInput<$PrismaModel>
    in?: $Enums.DeliverySide[]
    notIn?: $Enums.DeliverySide[]
    not?: NestedEnumDeliverySideFilter<$PrismaModel> | $Enums.DeliverySide
  }

  export type LobsterNullableScalarRelationFilter = {
    is?: LobsterWhereInput | null
    isNot?: LobsterWhereInput | null
  }

  export type DeliveryCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    lobsterId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    deliveredAt?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliveryAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type DeliveryMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    lobsterId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    deliveredAt?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliveryMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    lobsterId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    deliveredAt?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliverySumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type EnumDeliverySideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliverySide | EnumDeliverySideFieldRefInput<$PrismaModel>
    in?: $Enums.DeliverySide[]
    notIn?: $Enums.DeliverySide[]
    not?: NestedEnumDeliverySideWithAggregatesFilter<$PrismaModel> | $Enums.DeliverySide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliverySideFilter<$PrismaModel>
    _max?: NestedEnumDeliverySideFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AgentNullableScalarRelationFilter = {
    is?: AgentWhereInput | null
    isNot?: AgentWhereInput | null
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    content?: SortOrder
    sentiment?: SortOrder
    lobsterId?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    sentiment?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    content?: SortOrder
    sentiment?: SortOrder
    lobsterId?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    content?: SortOrder
    sentiment?: SortOrder
    lobsterId?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    sentiment?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type LogEntryCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    level?: SortOrder
    lobsterId?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
  }

  export type LogEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    level?: SortOrder
    lobsterId?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
  }

  export type LogEntryMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    level?: SortOrder
    lobsterId?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    status?: SortOrder
    rejectReason?: SortOrder
    submittedAt?: SortOrder
    matchedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    status?: SortOrder
    rejectReason?: SortOrder
    submittedAt?: SortOrder
    matchedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    competitionId?: SortOrder
    portfolioId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    status?: SortOrder
    rejectReason?: SortOrder
    submittedAt?: SortOrder
    matchedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DailySettlementPortfolioIdDateCompoundUniqueInput = {
    portfolioId: string
    date: string
  }

  export type DailySettlementCountOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    date?: SortOrder
    cash?: SortOrder
    positionJson?: SortOrder
    positionDays?: SortOrder
    totalValue?: SortOrder
    returnPct?: SortOrder
    createdAt?: SortOrder
  }

  export type DailySettlementAvgOrderByAggregateInput = {
    cash?: SortOrder
    positionDays?: SortOrder
    totalValue?: SortOrder
    returnPct?: SortOrder
  }

  export type DailySettlementMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    date?: SortOrder
    cash?: SortOrder
    positionJson?: SortOrder
    positionDays?: SortOrder
    totalValue?: SortOrder
    returnPct?: SortOrder
    createdAt?: SortOrder
  }

  export type DailySettlementMinOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    date?: SortOrder
    cash?: SortOrder
    positionJson?: SortOrder
    positionDays?: SortOrder
    totalValue?: SortOrder
    returnPct?: SortOrder
    createdAt?: SortOrder
  }

  export type DailySettlementSumOrderByAggregateInput = {
    cash?: SortOrder
    positionDays?: SortOrder
    totalValue?: SortOrder
    returnPct?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type TradeCreateNestedManyWithoutAgentInput = {
    create?: XOR<TradeCreateWithoutAgentInput, TradeUncheckedCreateWithoutAgentInput> | TradeCreateWithoutAgentInput[] | TradeUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutAgentInput | TradeCreateOrConnectWithoutAgentInput[]
    createMany?: TradeCreateManyAgentInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type PortfolioCreateNestedManyWithoutAgentInput = {
    create?: XOR<PortfolioCreateWithoutAgentInput, PortfolioUncheckedCreateWithoutAgentInput> | PortfolioCreateWithoutAgentInput[] | PortfolioUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutAgentInput | PortfolioCreateOrConnectWithoutAgentInput[]
    createMany?: PortfolioCreateManyAgentInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutAgentInput = {
    create?: XOR<OrderCreateWithoutAgentInput, OrderUncheckedCreateWithoutAgentInput> | OrderCreateWithoutAgentInput[] | OrderUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAgentInput | OrderCreateOrConnectWithoutAgentInput[]
    createMany?: OrderCreateManyAgentInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type LogEntryCreateNestedManyWithoutAgentInput = {
    create?: XOR<LogEntryCreateWithoutAgentInput, LogEntryUncheckedCreateWithoutAgentInput> | LogEntryCreateWithoutAgentInput[] | LogEntryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutAgentInput | LogEntryCreateOrConnectWithoutAgentInput[]
    createMany?: LogEntryCreateManyAgentInputEnvelope
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutAgentInput = {
    create?: XOR<CommentCreateWithoutAgentInput, CommentUncheckedCreateWithoutAgentInput> | CommentCreateWithoutAgentInput[] | CommentUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAgentInput | CommentCreateOrConnectWithoutAgentInput[]
    createMany?: CommentCreateManyAgentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DeliveryCreateNestedManyWithoutAgentInput = {
    create?: XOR<DeliveryCreateWithoutAgentInput, DeliveryUncheckedCreateWithoutAgentInput> | DeliveryCreateWithoutAgentInput[] | DeliveryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutAgentInput | DeliveryCreateOrConnectWithoutAgentInput[]
    createMany?: DeliveryCreateManyAgentInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<TradeCreateWithoutAgentInput, TradeUncheckedCreateWithoutAgentInput> | TradeCreateWithoutAgentInput[] | TradeUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutAgentInput | TradeCreateOrConnectWithoutAgentInput[]
    createMany?: TradeCreateManyAgentInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<PortfolioCreateWithoutAgentInput, PortfolioUncheckedCreateWithoutAgentInput> | PortfolioCreateWithoutAgentInput[] | PortfolioUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutAgentInput | PortfolioCreateOrConnectWithoutAgentInput[]
    createMany?: PortfolioCreateManyAgentInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<OrderCreateWithoutAgentInput, OrderUncheckedCreateWithoutAgentInput> | OrderCreateWithoutAgentInput[] | OrderUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAgentInput | OrderCreateOrConnectWithoutAgentInput[]
    createMany?: OrderCreateManyAgentInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type LogEntryUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<LogEntryCreateWithoutAgentInput, LogEntryUncheckedCreateWithoutAgentInput> | LogEntryCreateWithoutAgentInput[] | LogEntryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutAgentInput | LogEntryCreateOrConnectWithoutAgentInput[]
    createMany?: LogEntryCreateManyAgentInputEnvelope
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<CommentCreateWithoutAgentInput, CommentUncheckedCreateWithoutAgentInput> | CommentCreateWithoutAgentInput[] | CommentUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAgentInput | CommentCreateOrConnectWithoutAgentInput[]
    createMany?: CommentCreateManyAgentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DeliveryUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<DeliveryCreateWithoutAgentInput, DeliveryUncheckedCreateWithoutAgentInput> | DeliveryCreateWithoutAgentInput[] | DeliveryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutAgentInput | DeliveryCreateOrConnectWithoutAgentInput[]
    createMany?: DeliveryCreateManyAgentInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAgentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AgentStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TradeUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TradeCreateWithoutAgentInput, TradeUncheckedCreateWithoutAgentInput> | TradeCreateWithoutAgentInput[] | TradeUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutAgentInput | TradeCreateOrConnectWithoutAgentInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutAgentInput | TradeUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TradeCreateManyAgentInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutAgentInput | TradeUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutAgentInput | TradeUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type PortfolioUpdateManyWithoutAgentNestedInput = {
    create?: XOR<PortfolioCreateWithoutAgentInput, PortfolioUncheckedCreateWithoutAgentInput> | PortfolioCreateWithoutAgentInput[] | PortfolioUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutAgentInput | PortfolioCreateOrConnectWithoutAgentInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutAgentInput | PortfolioUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: PortfolioCreateManyAgentInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutAgentInput | PortfolioUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutAgentInput | PortfolioUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutAgentNestedInput = {
    create?: XOR<OrderCreateWithoutAgentInput, OrderUncheckedCreateWithoutAgentInput> | OrderCreateWithoutAgentInput[] | OrderUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAgentInput | OrderCreateOrConnectWithoutAgentInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAgentInput | OrderUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: OrderCreateManyAgentInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAgentInput | OrderUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAgentInput | OrderUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type LogEntryUpdateManyWithoutAgentNestedInput = {
    create?: XOR<LogEntryCreateWithoutAgentInput, LogEntryUncheckedCreateWithoutAgentInput> | LogEntryCreateWithoutAgentInput[] | LogEntryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutAgentInput | LogEntryCreateOrConnectWithoutAgentInput[]
    upsert?: LogEntryUpsertWithWhereUniqueWithoutAgentInput | LogEntryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: LogEntryCreateManyAgentInputEnvelope
    set?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    disconnect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    delete?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    update?: LogEntryUpdateWithWhereUniqueWithoutAgentInput | LogEntryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: LogEntryUpdateManyWithWhereWithoutAgentInput | LogEntryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: LogEntryScalarWhereInput | LogEntryScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutAgentNestedInput = {
    create?: XOR<CommentCreateWithoutAgentInput, CommentUncheckedCreateWithoutAgentInput> | CommentCreateWithoutAgentInput[] | CommentUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAgentInput | CommentCreateOrConnectWithoutAgentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAgentInput | CommentUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: CommentCreateManyAgentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAgentInput | CommentUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAgentInput | CommentUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type DeliveryUpdateManyWithoutAgentNestedInput = {
    create?: XOR<DeliveryCreateWithoutAgentInput, DeliveryUncheckedCreateWithoutAgentInput> | DeliveryCreateWithoutAgentInput[] | DeliveryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutAgentInput | DeliveryCreateOrConnectWithoutAgentInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutAgentInput | DeliveryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: DeliveryCreateManyAgentInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutAgentInput | DeliveryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutAgentInput | DeliveryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TradeCreateWithoutAgentInput, TradeUncheckedCreateWithoutAgentInput> | TradeCreateWithoutAgentInput[] | TradeUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutAgentInput | TradeCreateOrConnectWithoutAgentInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutAgentInput | TradeUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TradeCreateManyAgentInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutAgentInput | TradeUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutAgentInput | TradeUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<PortfolioCreateWithoutAgentInput, PortfolioUncheckedCreateWithoutAgentInput> | PortfolioCreateWithoutAgentInput[] | PortfolioUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutAgentInput | PortfolioCreateOrConnectWithoutAgentInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutAgentInput | PortfolioUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: PortfolioCreateManyAgentInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutAgentInput | PortfolioUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutAgentInput | PortfolioUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<OrderCreateWithoutAgentInput, OrderUncheckedCreateWithoutAgentInput> | OrderCreateWithoutAgentInput[] | OrderUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAgentInput | OrderCreateOrConnectWithoutAgentInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAgentInput | OrderUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: OrderCreateManyAgentInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAgentInput | OrderUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAgentInput | OrderUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type LogEntryUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<LogEntryCreateWithoutAgentInput, LogEntryUncheckedCreateWithoutAgentInput> | LogEntryCreateWithoutAgentInput[] | LogEntryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutAgentInput | LogEntryCreateOrConnectWithoutAgentInput[]
    upsert?: LogEntryUpsertWithWhereUniqueWithoutAgentInput | LogEntryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: LogEntryCreateManyAgentInputEnvelope
    set?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    disconnect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    delete?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    update?: LogEntryUpdateWithWhereUniqueWithoutAgentInput | LogEntryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: LogEntryUpdateManyWithWhereWithoutAgentInput | LogEntryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: LogEntryScalarWhereInput | LogEntryScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<CommentCreateWithoutAgentInput, CommentUncheckedCreateWithoutAgentInput> | CommentCreateWithoutAgentInput[] | CommentUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAgentInput | CommentCreateOrConnectWithoutAgentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAgentInput | CommentUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: CommentCreateManyAgentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAgentInput | CommentUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAgentInput | CommentUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type DeliveryUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<DeliveryCreateWithoutAgentInput, DeliveryUncheckedCreateWithoutAgentInput> | DeliveryCreateWithoutAgentInput[] | DeliveryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutAgentInput | DeliveryCreateOrConnectWithoutAgentInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutAgentInput | DeliveryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: DeliveryCreateManyAgentInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutAgentInput | DeliveryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutAgentInput | DeliveryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type PortfolioCreateNestedManyWithoutCompetitionInput = {
    create?: XOR<PortfolioCreateWithoutCompetitionInput, PortfolioUncheckedCreateWithoutCompetitionInput> | PortfolioCreateWithoutCompetitionInput[] | PortfolioUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutCompetitionInput | PortfolioCreateOrConnectWithoutCompetitionInput[]
    createMany?: PortfolioCreateManyCompetitionInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutCompetitionInput = {
    create?: XOR<OrderCreateWithoutCompetitionInput, OrderUncheckedCreateWithoutCompetitionInput> | OrderCreateWithoutCompetitionInput[] | OrderUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCompetitionInput | OrderCreateOrConnectWithoutCompetitionInput[]
    createMany?: OrderCreateManyCompetitionInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutCompetitionInput = {
    create?: XOR<PortfolioCreateWithoutCompetitionInput, PortfolioUncheckedCreateWithoutCompetitionInput> | PortfolioCreateWithoutCompetitionInput[] | PortfolioUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutCompetitionInput | PortfolioCreateOrConnectWithoutCompetitionInput[]
    createMany?: PortfolioCreateManyCompetitionInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutCompetitionInput = {
    create?: XOR<OrderCreateWithoutCompetitionInput, OrderUncheckedCreateWithoutCompetitionInput> | OrderCreateWithoutCompetitionInput[] | OrderUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCompetitionInput | OrderCreateOrConnectWithoutCompetitionInput[]
    createMany?: OrderCreateManyCompetitionInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type EnumCompetitionStatusFieldUpdateOperationsInput = {
    set?: $Enums.CompetitionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PortfolioUpdateManyWithoutCompetitionNestedInput = {
    create?: XOR<PortfolioCreateWithoutCompetitionInput, PortfolioUncheckedCreateWithoutCompetitionInput> | PortfolioCreateWithoutCompetitionInput[] | PortfolioUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutCompetitionInput | PortfolioCreateOrConnectWithoutCompetitionInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutCompetitionInput | PortfolioUpsertWithWhereUniqueWithoutCompetitionInput[]
    createMany?: PortfolioCreateManyCompetitionInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutCompetitionInput | PortfolioUpdateWithWhereUniqueWithoutCompetitionInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutCompetitionInput | PortfolioUpdateManyWithWhereWithoutCompetitionInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutCompetitionNestedInput = {
    create?: XOR<OrderCreateWithoutCompetitionInput, OrderUncheckedCreateWithoutCompetitionInput> | OrderCreateWithoutCompetitionInput[] | OrderUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCompetitionInput | OrderCreateOrConnectWithoutCompetitionInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCompetitionInput | OrderUpsertWithWhereUniqueWithoutCompetitionInput[]
    createMany?: OrderCreateManyCompetitionInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCompetitionInput | OrderUpdateWithWhereUniqueWithoutCompetitionInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCompetitionInput | OrderUpdateManyWithWhereWithoutCompetitionInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutCompetitionNestedInput = {
    create?: XOR<PortfolioCreateWithoutCompetitionInput, PortfolioUncheckedCreateWithoutCompetitionInput> | PortfolioCreateWithoutCompetitionInput[] | PortfolioUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutCompetitionInput | PortfolioCreateOrConnectWithoutCompetitionInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutCompetitionInput | PortfolioUpsertWithWhereUniqueWithoutCompetitionInput[]
    createMany?: PortfolioCreateManyCompetitionInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutCompetitionInput | PortfolioUpdateWithWhereUniqueWithoutCompetitionInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutCompetitionInput | PortfolioUpdateManyWithWhereWithoutCompetitionInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutCompetitionNestedInput = {
    create?: XOR<OrderCreateWithoutCompetitionInput, OrderUncheckedCreateWithoutCompetitionInput> | OrderCreateWithoutCompetitionInput[] | OrderUncheckedCreateWithoutCompetitionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCompetitionInput | OrderCreateOrConnectWithoutCompetitionInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCompetitionInput | OrderUpsertWithWhereUniqueWithoutCompetitionInput[]
    createMany?: OrderCreateManyCompetitionInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCompetitionInput | OrderUpdateWithWhereUniqueWithoutCompetitionInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCompetitionInput | OrderUpdateManyWithWhereWithoutCompetitionInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<AgentCreateWithoutPortfoliosInput, AgentUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPortfoliosInput
    connect?: AgentWhereUniqueInput
  }

  export type CompetitionCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<CompetitionCreateWithoutPortfoliosInput, CompetitionUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: CompetitionCreateOrConnectWithoutPortfoliosInput
    connect?: CompetitionWhereUniqueInput
  }

  export type PositionCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<PositionCreateWithoutPortfolioInput, PositionUncheckedCreateWithoutPortfolioInput> | PositionCreateWithoutPortfolioInput[] | PositionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutPortfolioInput | PositionCreateOrConnectWithoutPortfolioInput[]
    createMany?: PositionCreateManyPortfolioInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type DailySettlementCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<DailySettlementCreateWithoutPortfolioInput, DailySettlementUncheckedCreateWithoutPortfolioInput> | DailySettlementCreateWithoutPortfolioInput[] | DailySettlementUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: DailySettlementCreateOrConnectWithoutPortfolioInput | DailySettlementCreateOrConnectWithoutPortfolioInput[]
    createMany?: DailySettlementCreateManyPortfolioInputEnvelope
    connect?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
  }

  export type PositionUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<PositionCreateWithoutPortfolioInput, PositionUncheckedCreateWithoutPortfolioInput> | PositionCreateWithoutPortfolioInput[] | PositionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutPortfolioInput | PositionCreateOrConnectWithoutPortfolioInput[]
    createMany?: PositionCreateManyPortfolioInputEnvelope
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type DailySettlementUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<DailySettlementCreateWithoutPortfolioInput, DailySettlementUncheckedCreateWithoutPortfolioInput> | DailySettlementCreateWithoutPortfolioInput[] | DailySettlementUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: DailySettlementCreateOrConnectWithoutPortfolioInput | DailySettlementCreateOrConnectWithoutPortfolioInput[]
    createMany?: DailySettlementCreateManyPortfolioInputEnvelope
    connect?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
  }

  export type AgentUpdateOneRequiredWithoutPortfoliosNestedInput = {
    create?: XOR<AgentCreateWithoutPortfoliosInput, AgentUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPortfoliosInput
    upsert?: AgentUpsertWithoutPortfoliosInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutPortfoliosInput, AgentUpdateWithoutPortfoliosInput>, AgentUncheckedUpdateWithoutPortfoliosInput>
  }

  export type CompetitionUpdateOneRequiredWithoutPortfoliosNestedInput = {
    create?: XOR<CompetitionCreateWithoutPortfoliosInput, CompetitionUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: CompetitionCreateOrConnectWithoutPortfoliosInput
    upsert?: CompetitionUpsertWithoutPortfoliosInput
    connect?: CompetitionWhereUniqueInput
    update?: XOR<XOR<CompetitionUpdateToOneWithWhereWithoutPortfoliosInput, CompetitionUpdateWithoutPortfoliosInput>, CompetitionUncheckedUpdateWithoutPortfoliosInput>
  }

  export type PositionUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<PositionCreateWithoutPortfolioInput, PositionUncheckedCreateWithoutPortfolioInput> | PositionCreateWithoutPortfolioInput[] | PositionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutPortfolioInput | PositionCreateOrConnectWithoutPortfolioInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutPortfolioInput | PositionUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: PositionCreateManyPortfolioInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutPortfolioInput | PositionUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutPortfolioInput | PositionUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPortfolioInput | OrderUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPortfolioInput | OrderUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPortfolioInput | OrderUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type DailySettlementUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<DailySettlementCreateWithoutPortfolioInput, DailySettlementUncheckedCreateWithoutPortfolioInput> | DailySettlementCreateWithoutPortfolioInput[] | DailySettlementUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: DailySettlementCreateOrConnectWithoutPortfolioInput | DailySettlementCreateOrConnectWithoutPortfolioInput[]
    upsert?: DailySettlementUpsertWithWhereUniqueWithoutPortfolioInput | DailySettlementUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: DailySettlementCreateManyPortfolioInputEnvelope
    set?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    disconnect?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    delete?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    connect?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    update?: DailySettlementUpdateWithWhereUniqueWithoutPortfolioInput | DailySettlementUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: DailySettlementUpdateManyWithWhereWithoutPortfolioInput | DailySettlementUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: DailySettlementScalarWhereInput | DailySettlementScalarWhereInput[]
  }

  export type PositionUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<PositionCreateWithoutPortfolioInput, PositionUncheckedCreateWithoutPortfolioInput> | PositionCreateWithoutPortfolioInput[] | PositionUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PositionCreateOrConnectWithoutPortfolioInput | PositionCreateOrConnectWithoutPortfolioInput[]
    upsert?: PositionUpsertWithWhereUniqueWithoutPortfolioInput | PositionUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: PositionCreateManyPortfolioInputEnvelope
    set?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    disconnect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    delete?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    connect?: PositionWhereUniqueInput | PositionWhereUniqueInput[]
    update?: PositionUpdateWithWhereUniqueWithoutPortfolioInput | PositionUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: PositionUpdateManyWithWhereWithoutPortfolioInput | PositionUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: PositionScalarWhereInput | PositionScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPortfolioInput | OrderUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPortfolioInput | OrderUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPortfolioInput | OrderUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type DailySettlementUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<DailySettlementCreateWithoutPortfolioInput, DailySettlementUncheckedCreateWithoutPortfolioInput> | DailySettlementCreateWithoutPortfolioInput[] | DailySettlementUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: DailySettlementCreateOrConnectWithoutPortfolioInput | DailySettlementCreateOrConnectWithoutPortfolioInput[]
    upsert?: DailySettlementUpsertWithWhereUniqueWithoutPortfolioInput | DailySettlementUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: DailySettlementCreateManyPortfolioInputEnvelope
    set?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    disconnect?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    delete?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    connect?: DailySettlementWhereUniqueInput | DailySettlementWhereUniqueInput[]
    update?: DailySettlementUpdateWithWhereUniqueWithoutPortfolioInput | DailySettlementUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: DailySettlementUpdateManyWithWhereWithoutPortfolioInput | DailySettlementUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: DailySettlementScalarWhereInput | DailySettlementScalarWhereInput[]
  }

  export type PortfolioCreateNestedOneWithoutPositionsInput = {
    create?: XOR<PortfolioCreateWithoutPositionsInput, PortfolioUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutPositionsInput
    connect?: PortfolioWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PortfolioUpdateOneRequiredWithoutPositionsNestedInput = {
    create?: XOR<PortfolioCreateWithoutPositionsInput, PortfolioUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutPositionsInput
    upsert?: PortfolioUpsertWithoutPositionsInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutPositionsInput, PortfolioUpdateWithoutPositionsInput>, PortfolioUncheckedUpdateWithoutPositionsInput>
  }

  export type AgentCreateNestedOneWithoutTradesInput = {
    create?: XOR<AgentCreateWithoutTradesInput, AgentUncheckedCreateWithoutTradesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutTradesInput
    connect?: AgentWhereUniqueInput
  }

  export type EnumTradeSideFieldUpdateOperationsInput = {
    set?: $Enums.TradeSide
  }

  export type EnumTradeStatusFieldUpdateOperationsInput = {
    set?: $Enums.TradeStatus
  }

  export type AgentUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<AgentCreateWithoutTradesInput, AgentUncheckedCreateWithoutTradesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutTradesInput
    upsert?: AgentUpsertWithoutTradesInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutTradesInput, AgentUpdateWithoutTradesInput>, AgentUncheckedUpdateWithoutTradesInput>
  }

  export type DeliveryCreateNestedManyWithoutLobsterInput = {
    create?: XOR<DeliveryCreateWithoutLobsterInput, DeliveryUncheckedCreateWithoutLobsterInput> | DeliveryCreateWithoutLobsterInput[] | DeliveryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutLobsterInput | DeliveryCreateOrConnectWithoutLobsterInput[]
    createMany?: DeliveryCreateManyLobsterInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutLobsterInput = {
    create?: XOR<CommentCreateWithoutLobsterInput, CommentUncheckedCreateWithoutLobsterInput> | CommentCreateWithoutLobsterInput[] | CommentUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutLobsterInput | CommentCreateOrConnectWithoutLobsterInput[]
    createMany?: CommentCreateManyLobsterInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type LogEntryCreateNestedManyWithoutLobsterInput = {
    create?: XOR<LogEntryCreateWithoutLobsterInput, LogEntryUncheckedCreateWithoutLobsterInput> | LogEntryCreateWithoutLobsterInput[] | LogEntryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutLobsterInput | LogEntryCreateOrConnectWithoutLobsterInput[]
    createMany?: LogEntryCreateManyLobsterInputEnvelope
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
  }

  export type DeliveryUncheckedCreateNestedManyWithoutLobsterInput = {
    create?: XOR<DeliveryCreateWithoutLobsterInput, DeliveryUncheckedCreateWithoutLobsterInput> | DeliveryCreateWithoutLobsterInput[] | DeliveryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutLobsterInput | DeliveryCreateOrConnectWithoutLobsterInput[]
    createMany?: DeliveryCreateManyLobsterInputEnvelope
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutLobsterInput = {
    create?: XOR<CommentCreateWithoutLobsterInput, CommentUncheckedCreateWithoutLobsterInput> | CommentCreateWithoutLobsterInput[] | CommentUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutLobsterInput | CommentCreateOrConnectWithoutLobsterInput[]
    createMany?: CommentCreateManyLobsterInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type LogEntryUncheckedCreateNestedManyWithoutLobsterInput = {
    create?: XOR<LogEntryCreateWithoutLobsterInput, LogEntryUncheckedCreateWithoutLobsterInput> | LogEntryCreateWithoutLobsterInput[] | LogEntryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutLobsterInput | LogEntryCreateOrConnectWithoutLobsterInput[]
    createMany?: LogEntryCreateManyLobsterInputEnvelope
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
  }

  export type EnumLobsterKeyFieldUpdateOperationsInput = {
    set?: $Enums.LobsterKey
  }

  export type DeliveryUpdateManyWithoutLobsterNestedInput = {
    create?: XOR<DeliveryCreateWithoutLobsterInput, DeliveryUncheckedCreateWithoutLobsterInput> | DeliveryCreateWithoutLobsterInput[] | DeliveryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutLobsterInput | DeliveryCreateOrConnectWithoutLobsterInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutLobsterInput | DeliveryUpsertWithWhereUniqueWithoutLobsterInput[]
    createMany?: DeliveryCreateManyLobsterInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutLobsterInput | DeliveryUpdateWithWhereUniqueWithoutLobsterInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutLobsterInput | DeliveryUpdateManyWithWhereWithoutLobsterInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutLobsterNestedInput = {
    create?: XOR<CommentCreateWithoutLobsterInput, CommentUncheckedCreateWithoutLobsterInput> | CommentCreateWithoutLobsterInput[] | CommentUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutLobsterInput | CommentCreateOrConnectWithoutLobsterInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutLobsterInput | CommentUpsertWithWhereUniqueWithoutLobsterInput[]
    createMany?: CommentCreateManyLobsterInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutLobsterInput | CommentUpdateWithWhereUniqueWithoutLobsterInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutLobsterInput | CommentUpdateManyWithWhereWithoutLobsterInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type LogEntryUpdateManyWithoutLobsterNestedInput = {
    create?: XOR<LogEntryCreateWithoutLobsterInput, LogEntryUncheckedCreateWithoutLobsterInput> | LogEntryCreateWithoutLobsterInput[] | LogEntryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutLobsterInput | LogEntryCreateOrConnectWithoutLobsterInput[]
    upsert?: LogEntryUpsertWithWhereUniqueWithoutLobsterInput | LogEntryUpsertWithWhereUniqueWithoutLobsterInput[]
    createMany?: LogEntryCreateManyLobsterInputEnvelope
    set?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    disconnect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    delete?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    update?: LogEntryUpdateWithWhereUniqueWithoutLobsterInput | LogEntryUpdateWithWhereUniqueWithoutLobsterInput[]
    updateMany?: LogEntryUpdateManyWithWhereWithoutLobsterInput | LogEntryUpdateManyWithWhereWithoutLobsterInput[]
    deleteMany?: LogEntryScalarWhereInput | LogEntryScalarWhereInput[]
  }

  export type DeliveryUncheckedUpdateManyWithoutLobsterNestedInput = {
    create?: XOR<DeliveryCreateWithoutLobsterInput, DeliveryUncheckedCreateWithoutLobsterInput> | DeliveryCreateWithoutLobsterInput[] | DeliveryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: DeliveryCreateOrConnectWithoutLobsterInput | DeliveryCreateOrConnectWithoutLobsterInput[]
    upsert?: DeliveryUpsertWithWhereUniqueWithoutLobsterInput | DeliveryUpsertWithWhereUniqueWithoutLobsterInput[]
    createMany?: DeliveryCreateManyLobsterInputEnvelope
    set?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    disconnect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    delete?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    connect?: DeliveryWhereUniqueInput | DeliveryWhereUniqueInput[]
    update?: DeliveryUpdateWithWhereUniqueWithoutLobsterInput | DeliveryUpdateWithWhereUniqueWithoutLobsterInput[]
    updateMany?: DeliveryUpdateManyWithWhereWithoutLobsterInput | DeliveryUpdateManyWithWhereWithoutLobsterInput[]
    deleteMany?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutLobsterNestedInput = {
    create?: XOR<CommentCreateWithoutLobsterInput, CommentUncheckedCreateWithoutLobsterInput> | CommentCreateWithoutLobsterInput[] | CommentUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutLobsterInput | CommentCreateOrConnectWithoutLobsterInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutLobsterInput | CommentUpsertWithWhereUniqueWithoutLobsterInput[]
    createMany?: CommentCreateManyLobsterInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutLobsterInput | CommentUpdateWithWhereUniqueWithoutLobsterInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutLobsterInput | CommentUpdateManyWithWhereWithoutLobsterInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type LogEntryUncheckedUpdateManyWithoutLobsterNestedInput = {
    create?: XOR<LogEntryCreateWithoutLobsterInput, LogEntryUncheckedCreateWithoutLobsterInput> | LogEntryCreateWithoutLobsterInput[] | LogEntryUncheckedCreateWithoutLobsterInput[]
    connectOrCreate?: LogEntryCreateOrConnectWithoutLobsterInput | LogEntryCreateOrConnectWithoutLobsterInput[]
    upsert?: LogEntryUpsertWithWhereUniqueWithoutLobsterInput | LogEntryUpsertWithWhereUniqueWithoutLobsterInput[]
    createMany?: LogEntryCreateManyLobsterInputEnvelope
    set?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    disconnect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    delete?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    connect?: LogEntryWhereUniqueInput | LogEntryWhereUniqueInput[]
    update?: LogEntryUpdateWithWhereUniqueWithoutLobsterInput | LogEntryUpdateWithWhereUniqueWithoutLobsterInput[]
    updateMany?: LogEntryUpdateManyWithWhereWithoutLobsterInput | LogEntryUpdateManyWithWhereWithoutLobsterInput[]
    deleteMany?: LogEntryScalarWhereInput | LogEntryScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<AgentCreateWithoutDeliveriesInput, AgentUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutDeliveriesInput
    connect?: AgentWhereUniqueInput
  }

  export type LobsterCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<LobsterCreateWithoutDeliveriesInput, LobsterUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: LobsterCreateOrConnectWithoutDeliveriesInput
    connect?: LobsterWhereUniqueInput
  }

  export type EnumDeliverySideFieldUpdateOperationsInput = {
    set?: $Enums.DeliverySide
  }

  export type AgentUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<AgentCreateWithoutDeliveriesInput, AgentUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutDeliveriesInput
    upsert?: AgentUpsertWithoutDeliveriesInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutDeliveriesInput, AgentUpdateWithoutDeliveriesInput>, AgentUncheckedUpdateWithoutDeliveriesInput>
  }

  export type LobsterUpdateOneWithoutDeliveriesNestedInput = {
    create?: XOR<LobsterCreateWithoutDeliveriesInput, LobsterUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: LobsterCreateOrConnectWithoutDeliveriesInput
    upsert?: LobsterUpsertWithoutDeliveriesInput
    disconnect?: LobsterWhereInput | boolean
    delete?: LobsterWhereInput | boolean
    connect?: LobsterWhereUniqueInput
    update?: XOR<XOR<LobsterUpdateToOneWithWhereWithoutDeliveriesInput, LobsterUpdateWithoutDeliveriesInput>, LobsterUncheckedUpdateWithoutDeliveriesInput>
  }

  export type LobsterCreateNestedOneWithoutCommentsInput = {
    create?: XOR<LobsterCreateWithoutCommentsInput, LobsterUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: LobsterCreateOrConnectWithoutCommentsInput
    connect?: LobsterWhereUniqueInput
  }

  export type AgentCreateNestedOneWithoutCommentsInput = {
    create?: XOR<AgentCreateWithoutCommentsInput, AgentUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutCommentsInput
    connect?: AgentWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LobsterUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<LobsterCreateWithoutCommentsInput, LobsterUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: LobsterCreateOrConnectWithoutCommentsInput
    upsert?: LobsterUpsertWithoutCommentsInput
    disconnect?: LobsterWhereInput | boolean
    delete?: LobsterWhereInput | boolean
    connect?: LobsterWhereUniqueInput
    update?: XOR<XOR<LobsterUpdateToOneWithWhereWithoutCommentsInput, LobsterUpdateWithoutCommentsInput>, LobsterUncheckedUpdateWithoutCommentsInput>
  }

  export type AgentUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<AgentCreateWithoutCommentsInput, AgentUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutCommentsInput
    upsert?: AgentUpsertWithoutCommentsInput
    disconnect?: AgentWhereInput | boolean
    delete?: AgentWhereInput | boolean
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutCommentsInput, AgentUpdateWithoutCommentsInput>, AgentUncheckedUpdateWithoutCommentsInput>
  }

  export type LobsterCreateNestedOneWithoutLogsInput = {
    create?: XOR<LobsterCreateWithoutLogsInput, LobsterUncheckedCreateWithoutLogsInput>
    connectOrCreate?: LobsterCreateOrConnectWithoutLogsInput
    connect?: LobsterWhereUniqueInput
  }

  export type AgentCreateNestedOneWithoutLogsInput = {
    create?: XOR<AgentCreateWithoutLogsInput, AgentUncheckedCreateWithoutLogsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutLogsInput
    connect?: AgentWhereUniqueInput
  }

  export type LobsterUpdateOneWithoutLogsNestedInput = {
    create?: XOR<LobsterCreateWithoutLogsInput, LobsterUncheckedCreateWithoutLogsInput>
    connectOrCreate?: LobsterCreateOrConnectWithoutLogsInput
    upsert?: LobsterUpsertWithoutLogsInput
    disconnect?: LobsterWhereInput | boolean
    delete?: LobsterWhereInput | boolean
    connect?: LobsterWhereUniqueInput
    update?: XOR<XOR<LobsterUpdateToOneWithWhereWithoutLogsInput, LobsterUpdateWithoutLogsInput>, LobsterUncheckedUpdateWithoutLogsInput>
  }

  export type AgentUpdateOneWithoutLogsNestedInput = {
    create?: XOR<AgentCreateWithoutLogsInput, AgentUncheckedCreateWithoutLogsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutLogsInput
    upsert?: AgentUpsertWithoutLogsInput
    disconnect?: AgentWhereInput | boolean
    delete?: AgentWhereInput | boolean
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutLogsInput, AgentUpdateWithoutLogsInput>, AgentUncheckedUpdateWithoutLogsInput>
  }

  export type AgentCreateNestedOneWithoutOrdersInput = {
    create?: XOR<AgentCreateWithoutOrdersInput, AgentUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AgentCreateOrConnectWithoutOrdersInput
    connect?: AgentWhereUniqueInput
  }

  export type CompetitionCreateNestedOneWithoutOrdersInput = {
    create?: XOR<CompetitionCreateWithoutOrdersInput, CompetitionUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CompetitionCreateOrConnectWithoutOrdersInput
    connect?: CompetitionWhereUniqueInput
  }

  export type PortfolioCreateNestedOneWithoutOrdersInput = {
    create?: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutOrdersInput
    connect?: PortfolioWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<AgentCreateWithoutOrdersInput, AgentUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AgentCreateOrConnectWithoutOrdersInput
    upsert?: AgentUpsertWithoutOrdersInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutOrdersInput, AgentUpdateWithoutOrdersInput>, AgentUncheckedUpdateWithoutOrdersInput>
  }

  export type CompetitionUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<CompetitionCreateWithoutOrdersInput, CompetitionUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CompetitionCreateOrConnectWithoutOrdersInput
    upsert?: CompetitionUpsertWithoutOrdersInput
    connect?: CompetitionWhereUniqueInput
    update?: XOR<XOR<CompetitionUpdateToOneWithWhereWithoutOrdersInput, CompetitionUpdateWithoutOrdersInput>, CompetitionUncheckedUpdateWithoutOrdersInput>
  }

  export type PortfolioUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutOrdersInput
    upsert?: PortfolioUpsertWithoutOrdersInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutOrdersInput, PortfolioUpdateWithoutOrdersInput>, PortfolioUncheckedUpdateWithoutOrdersInput>
  }

  export type PortfolioCreateNestedOneWithoutSettlementsInput = {
    create?: XOR<PortfolioCreateWithoutSettlementsInput, PortfolioUncheckedCreateWithoutSettlementsInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutSettlementsInput
    connect?: PortfolioWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PortfolioUpdateOneRequiredWithoutSettlementsNestedInput = {
    create?: XOR<PortfolioCreateWithoutSettlementsInput, PortfolioUncheckedCreateWithoutSettlementsInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutSettlementsInput
    upsert?: PortfolioUpsertWithoutSettlementsInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutSettlementsInput, PortfolioUpdateWithoutSettlementsInput>, PortfolioUncheckedUpdateWithoutSettlementsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumAgentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusFilter<$PrismaModel> | $Enums.AgentStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCompetitionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CompetitionStatus | EnumCompetitionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompetitionStatus[]
    notIn?: $Enums.CompetitionStatus[]
    not?: NestedEnumCompetitionStatusFilter<$PrismaModel> | $Enums.CompetitionStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCompetitionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompetitionStatus | EnumCompetitionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CompetitionStatus[]
    notIn?: $Enums.CompetitionStatus[]
    not?: NestedEnumCompetitionStatusWithAggregatesFilter<$PrismaModel> | $Enums.CompetitionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompetitionStatusFilter<$PrismaModel>
    _max?: NestedEnumCompetitionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumTradeSideFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeSide | EnumTradeSideFieldRefInput<$PrismaModel>
    in?: $Enums.TradeSide[]
    notIn?: $Enums.TradeSide[]
    not?: NestedEnumTradeSideFilter<$PrismaModel> | $Enums.TradeSide
  }

  export type NestedEnumTradeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[]
    notIn?: $Enums.TradeStatus[]
    not?: NestedEnumTradeStatusFilter<$PrismaModel> | $Enums.TradeStatus
  }

  export type NestedEnumTradeSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeSide | EnumTradeSideFieldRefInput<$PrismaModel>
    in?: $Enums.TradeSide[]
    notIn?: $Enums.TradeSide[]
    not?: NestedEnumTradeSideWithAggregatesFilter<$PrismaModel> | $Enums.TradeSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeSideFilter<$PrismaModel>
    _max?: NestedEnumTradeSideFilter<$PrismaModel>
  }

  export type NestedEnumTradeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TradeStatus | EnumTradeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TradeStatus[]
    notIn?: $Enums.TradeStatus[]
    not?: NestedEnumTradeStatusWithAggregatesFilter<$PrismaModel> | $Enums.TradeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTradeStatusFilter<$PrismaModel>
    _max?: NestedEnumTradeStatusFilter<$PrismaModel>
  }

  export type NestedEnumLobsterKeyFilter<$PrismaModel = never> = {
    equals?: $Enums.LobsterKey | EnumLobsterKeyFieldRefInput<$PrismaModel>
    in?: $Enums.LobsterKey[]
    notIn?: $Enums.LobsterKey[]
    not?: NestedEnumLobsterKeyFilter<$PrismaModel> | $Enums.LobsterKey
  }

  export type NestedEnumLobsterKeyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LobsterKey | EnumLobsterKeyFieldRefInput<$PrismaModel>
    in?: $Enums.LobsterKey[]
    notIn?: $Enums.LobsterKey[]
    not?: NestedEnumLobsterKeyWithAggregatesFilter<$PrismaModel> | $Enums.LobsterKey
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLobsterKeyFilter<$PrismaModel>
    _max?: NestedEnumLobsterKeyFilter<$PrismaModel>
  }

  export type NestedEnumDeliverySideFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliverySide | EnumDeliverySideFieldRefInput<$PrismaModel>
    in?: $Enums.DeliverySide[]
    notIn?: $Enums.DeliverySide[]
    not?: NestedEnumDeliverySideFilter<$PrismaModel> | $Enums.DeliverySide
  }

  export type NestedEnumDeliverySideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliverySide | EnumDeliverySideFieldRefInput<$PrismaModel>
    in?: $Enums.DeliverySide[]
    notIn?: $Enums.DeliverySide[]
    not?: NestedEnumDeliverySideWithAggregatesFilter<$PrismaModel> | $Enums.DeliverySide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliverySideFilter<$PrismaModel>
    _max?: NestedEnumDeliverySideFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type TradeCreateWithoutAgentInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    price: number
    status?: $Enums.TradeStatus
    filledAt?: Date | string | null
    executedPrice?: number | null
    note?: string | null
    commission?: number | null
    stampTax?: number | null
    transferFee?: number | null
    netAmount?: number | null
    createdAt?: Date | string
  }

  export type TradeUncheckedCreateWithoutAgentInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    price: number
    status?: $Enums.TradeStatus
    filledAt?: Date | string | null
    executedPrice?: number | null
    note?: string | null
    commission?: number | null
    stampTax?: number | null
    transferFee?: number | null
    netAmount?: number | null
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutAgentInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutAgentInput, TradeUncheckedCreateWithoutAgentInput>
  }

  export type TradeCreateManyAgentInputEnvelope = {
    data: TradeCreateManyAgentInput | TradeCreateManyAgentInput[]
  }

  export type PortfolioCreateWithoutAgentInput = {
    id?: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    competition: CompetitionCreateNestedOneWithoutPortfoliosInput
    positions?: PositionCreateNestedManyWithoutPortfolioInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutAgentInput = {
    id?: string
    competitionId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutPortfolioInput
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutAgentInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutAgentInput, PortfolioUncheckedCreateWithoutAgentInput>
  }

  export type PortfolioCreateManyAgentInputEnvelope = {
    data: PortfolioCreateManyAgentInput | PortfolioCreateManyAgentInput[]
  }

  export type OrderCreateWithoutAgentInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
    competition: CompetitionCreateNestedOneWithoutOrdersInput
    portfolio: PortfolioCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutAgentInput = {
    id?: string
    competitionId: string
    portfolioId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type OrderCreateOrConnectWithoutAgentInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutAgentInput, OrderUncheckedCreateWithoutAgentInput>
  }

  export type OrderCreateManyAgentInputEnvelope = {
    data: OrderCreateManyAgentInput | OrderCreateManyAgentInput[]
  }

  export type LogEntryCreateWithoutAgentInput = {
    id?: string
    title: string
    content: string
    level?: string
    createdAt?: Date | string
    lobster?: LobsterCreateNestedOneWithoutLogsInput
  }

  export type LogEntryUncheckedCreateWithoutAgentInput = {
    id?: string
    title: string
    content: string
    level?: string
    lobsterId?: string | null
    createdAt?: Date | string
  }

  export type LogEntryCreateOrConnectWithoutAgentInput = {
    where: LogEntryWhereUniqueInput
    create: XOR<LogEntryCreateWithoutAgentInput, LogEntryUncheckedCreateWithoutAgentInput>
  }

  export type LogEntryCreateManyAgentInputEnvelope = {
    data: LogEntryCreateManyAgentInput | LogEntryCreateManyAgentInput[]
  }

  export type CommentCreateWithoutAgentInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    createdAt?: Date | string
    lobster?: LobsterCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutAgentInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    lobsterId?: string | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutAgentInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutAgentInput, CommentUncheckedCreateWithoutAgentInput>
  }

  export type CommentCreateManyAgentInputEnvelope = {
    data: CommentCreateManyAgentInput | CommentCreateManyAgentInput[]
  }

  export type DeliveryCreateWithoutAgentInput = {
    id?: string
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
    lobster?: LobsterCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateWithoutAgentInput = {
    id?: string
    lobsterId?: string | null
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
  }

  export type DeliveryCreateOrConnectWithoutAgentInput = {
    where: DeliveryWhereUniqueInput
    create: XOR<DeliveryCreateWithoutAgentInput, DeliveryUncheckedCreateWithoutAgentInput>
  }

  export type DeliveryCreateManyAgentInputEnvelope = {
    data: DeliveryCreateManyAgentInput | DeliveryCreateManyAgentInput[]
  }

  export type TradeUpsertWithWhereUniqueWithoutAgentInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutAgentInput, TradeUncheckedUpdateWithoutAgentInput>
    create: XOR<TradeCreateWithoutAgentInput, TradeUncheckedCreateWithoutAgentInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutAgentInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutAgentInput, TradeUncheckedUpdateWithoutAgentInput>
  }

  export type TradeUpdateManyWithWhereWithoutAgentInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutAgentInput>
  }

  export type TradeScalarWhereInput = {
    AND?: TradeScalarWhereInput | TradeScalarWhereInput[]
    OR?: TradeScalarWhereInput[]
    NOT?: TradeScalarWhereInput | TradeScalarWhereInput[]
    id?: StringFilter<"Trade"> | string
    agentId?: StringFilter<"Trade"> | string
    symbol?: StringFilter<"Trade"> | string
    side?: EnumTradeSideFilter<"Trade"> | $Enums.TradeSide
    quantity?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    status?: EnumTradeStatusFilter<"Trade"> | $Enums.TradeStatus
    filledAt?: DateTimeNullableFilter<"Trade"> | Date | string | null
    executedPrice?: FloatNullableFilter<"Trade"> | number | null
    note?: StringNullableFilter<"Trade"> | string | null
    commission?: FloatNullableFilter<"Trade"> | number | null
    stampTax?: FloatNullableFilter<"Trade"> | number | null
    transferFee?: FloatNullableFilter<"Trade"> | number | null
    netAmount?: FloatNullableFilter<"Trade"> | number | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
  }

  export type PortfolioUpsertWithWhereUniqueWithoutAgentInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutAgentInput, PortfolioUncheckedUpdateWithoutAgentInput>
    create: XOR<PortfolioCreateWithoutAgentInput, PortfolioUncheckedCreateWithoutAgentInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutAgentInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutAgentInput, PortfolioUncheckedUpdateWithoutAgentInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutAgentInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutAgentInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    agentId?: StringFilter<"Portfolio"> | string
    competitionId?: StringFilter<"Portfolio"> | string
    cash?: FloatFilter<"Portfolio"> | number
    totalValue?: FloatFilter<"Portfolio"> | number
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutAgentInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutAgentInput, OrderUncheckedUpdateWithoutAgentInput>
    create: XOR<OrderCreateWithoutAgentInput, OrderUncheckedCreateWithoutAgentInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutAgentInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutAgentInput, OrderUncheckedUpdateWithoutAgentInput>
  }

  export type OrderUpdateManyWithWhereWithoutAgentInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutAgentInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    agentId?: StringFilter<"Order"> | string
    competitionId?: StringFilter<"Order"> | string
    portfolioId?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    side?: EnumTradeSideFilter<"Order"> | $Enums.TradeSide
    quantity?: FloatFilter<"Order"> | number
    note?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    rejectReason?: StringNullableFilter<"Order"> | string | null
    submittedAt?: DateTimeFilter<"Order"> | Date | string
    matchedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
  }

  export type LogEntryUpsertWithWhereUniqueWithoutAgentInput = {
    where: LogEntryWhereUniqueInput
    update: XOR<LogEntryUpdateWithoutAgentInput, LogEntryUncheckedUpdateWithoutAgentInput>
    create: XOR<LogEntryCreateWithoutAgentInput, LogEntryUncheckedCreateWithoutAgentInput>
  }

  export type LogEntryUpdateWithWhereUniqueWithoutAgentInput = {
    where: LogEntryWhereUniqueInput
    data: XOR<LogEntryUpdateWithoutAgentInput, LogEntryUncheckedUpdateWithoutAgentInput>
  }

  export type LogEntryUpdateManyWithWhereWithoutAgentInput = {
    where: LogEntryScalarWhereInput
    data: XOR<LogEntryUpdateManyMutationInput, LogEntryUncheckedUpdateManyWithoutAgentInput>
  }

  export type LogEntryScalarWhereInput = {
    AND?: LogEntryScalarWhereInput | LogEntryScalarWhereInput[]
    OR?: LogEntryScalarWhereInput[]
    NOT?: LogEntryScalarWhereInput | LogEntryScalarWhereInput[]
    id?: StringFilter<"LogEntry"> | string
    title?: StringFilter<"LogEntry"> | string
    content?: StringFilter<"LogEntry"> | string
    level?: StringFilter<"LogEntry"> | string
    lobsterId?: StringNullableFilter<"LogEntry"> | string | null
    agentId?: StringNullableFilter<"LogEntry"> | string | null
    createdAt?: DateTimeFilter<"LogEntry"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutAgentInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutAgentInput, CommentUncheckedUpdateWithoutAgentInput>
    create: XOR<CommentCreateWithoutAgentInput, CommentUncheckedCreateWithoutAgentInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutAgentInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutAgentInput, CommentUncheckedUpdateWithoutAgentInput>
  }

  export type CommentUpdateManyWithWhereWithoutAgentInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutAgentInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    author?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    sentiment?: IntNullableFilter<"Comment"> | number | null
    lobsterId?: StringNullableFilter<"Comment"> | string | null
    agentId?: StringNullableFilter<"Comment"> | string | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type DeliveryUpsertWithWhereUniqueWithoutAgentInput = {
    where: DeliveryWhereUniqueInput
    update: XOR<DeliveryUpdateWithoutAgentInput, DeliveryUncheckedUpdateWithoutAgentInput>
    create: XOR<DeliveryCreateWithoutAgentInput, DeliveryUncheckedCreateWithoutAgentInput>
  }

  export type DeliveryUpdateWithWhereUniqueWithoutAgentInput = {
    where: DeliveryWhereUniqueInput
    data: XOR<DeliveryUpdateWithoutAgentInput, DeliveryUncheckedUpdateWithoutAgentInput>
  }

  export type DeliveryUpdateManyWithWhereWithoutAgentInput = {
    where: DeliveryScalarWhereInput
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyWithoutAgentInput>
  }

  export type DeliveryScalarWhereInput = {
    AND?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
    OR?: DeliveryScalarWhereInput[]
    NOT?: DeliveryScalarWhereInput | DeliveryScalarWhereInput[]
    id?: StringFilter<"Delivery"> | string
    agentId?: StringFilter<"Delivery"> | string
    lobsterId?: StringNullableFilter<"Delivery"> | string | null
    symbol?: StringFilter<"Delivery"> | string
    side?: EnumDeliverySideFilter<"Delivery"> | $Enums.DeliverySide
    quantity?: FloatFilter<"Delivery"> | number
    price?: FloatFilter<"Delivery"> | number
    deliveredAt?: DateTimeFilter<"Delivery"> | Date | string
    note?: StringNullableFilter<"Delivery"> | string | null
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
  }

  export type PortfolioCreateWithoutCompetitionInput = {
    id?: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPortfoliosInput
    positions?: PositionCreateNestedManyWithoutPortfolioInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutCompetitionInput = {
    id?: string
    agentId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutPortfolioInput
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutCompetitionInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutCompetitionInput, PortfolioUncheckedCreateWithoutCompetitionInput>
  }

  export type PortfolioCreateManyCompetitionInputEnvelope = {
    data: PortfolioCreateManyCompetitionInput | PortfolioCreateManyCompetitionInput[]
  }

  export type OrderCreateWithoutCompetitionInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
    agent: AgentCreateNestedOneWithoutOrdersInput
    portfolio: PortfolioCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutCompetitionInput = {
    id?: string
    agentId: string
    portfolioId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type OrderCreateOrConnectWithoutCompetitionInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutCompetitionInput, OrderUncheckedCreateWithoutCompetitionInput>
  }

  export type OrderCreateManyCompetitionInputEnvelope = {
    data: OrderCreateManyCompetitionInput | OrderCreateManyCompetitionInput[]
  }

  export type PortfolioUpsertWithWhereUniqueWithoutCompetitionInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutCompetitionInput, PortfolioUncheckedUpdateWithoutCompetitionInput>
    create: XOR<PortfolioCreateWithoutCompetitionInput, PortfolioUncheckedCreateWithoutCompetitionInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutCompetitionInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutCompetitionInput, PortfolioUncheckedUpdateWithoutCompetitionInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutCompetitionInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutCompetitionInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutCompetitionInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutCompetitionInput, OrderUncheckedUpdateWithoutCompetitionInput>
    create: XOR<OrderCreateWithoutCompetitionInput, OrderUncheckedCreateWithoutCompetitionInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutCompetitionInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutCompetitionInput, OrderUncheckedUpdateWithoutCompetitionInput>
  }

  export type OrderUpdateManyWithWhereWithoutCompetitionInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutCompetitionInput>
  }

  export type AgentCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutAgentInput
    orders?: OrderCreateNestedManyWithoutAgentInput
    logs?: LogEntryCreateNestedManyWithoutAgentInput
    comments?: CommentCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutAgentInput
    orders?: OrderUncheckedCreateNestedManyWithoutAgentInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutAgentInput
    comments?: CommentUncheckedCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutPortfoliosInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutPortfoliosInput, AgentUncheckedCreateWithoutPortfoliosInput>
  }

  export type CompetitionCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CompetitionStatus
    startAt?: Date | string | null
    endAt?: Date | string | null
    initialCash?: number
    market?: string
    testMode?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutCompetitionInput
  }

  export type CompetitionUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CompetitionStatus
    startAt?: Date | string | null
    endAt?: Date | string | null
    initialCash?: number
    market?: string
    testMode?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutCompetitionInput
  }

  export type CompetitionCreateOrConnectWithoutPortfoliosInput = {
    where: CompetitionWhereUniqueInput
    create: XOR<CompetitionCreateWithoutPortfoliosInput, CompetitionUncheckedCreateWithoutPortfoliosInput>
  }

  export type PositionCreateWithoutPortfolioInput = {
    id?: string
    symbol: string
    quantity: number
    avgCost: number
    currentPrice?: number | null
    boughtAt?: Date | string
    updatedAt?: Date | string
  }

  export type PositionUncheckedCreateWithoutPortfolioInput = {
    id?: string
    symbol: string
    quantity: number
    avgCost: number
    currentPrice?: number | null
    boughtAt?: Date | string
    updatedAt?: Date | string
  }

  export type PositionCreateOrConnectWithoutPortfolioInput = {
    where: PositionWhereUniqueInput
    create: XOR<PositionCreateWithoutPortfolioInput, PositionUncheckedCreateWithoutPortfolioInput>
  }

  export type PositionCreateManyPortfolioInputEnvelope = {
    data: PositionCreateManyPortfolioInput | PositionCreateManyPortfolioInput[]
  }

  export type OrderCreateWithoutPortfolioInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
    agent: AgentCreateNestedOneWithoutOrdersInput
    competition: CompetitionCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutPortfolioInput = {
    id?: string
    agentId: string
    competitionId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type OrderCreateOrConnectWithoutPortfolioInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput>
  }

  export type OrderCreateManyPortfolioInputEnvelope = {
    data: OrderCreateManyPortfolioInput | OrderCreateManyPortfolioInput[]
  }

  export type DailySettlementCreateWithoutPortfolioInput = {
    id?: string
    date: string
    cash: number
    positionJson?: string | null
    positionDays?: number
    totalValue: number
    returnPct: number
    createdAt?: Date | string
  }

  export type DailySettlementUncheckedCreateWithoutPortfolioInput = {
    id?: string
    date: string
    cash: number
    positionJson?: string | null
    positionDays?: number
    totalValue: number
    returnPct: number
    createdAt?: Date | string
  }

  export type DailySettlementCreateOrConnectWithoutPortfolioInput = {
    where: DailySettlementWhereUniqueInput
    create: XOR<DailySettlementCreateWithoutPortfolioInput, DailySettlementUncheckedCreateWithoutPortfolioInput>
  }

  export type DailySettlementCreateManyPortfolioInputEnvelope = {
    data: DailySettlementCreateManyPortfolioInput | DailySettlementCreateManyPortfolioInput[]
  }

  export type AgentUpsertWithoutPortfoliosInput = {
    update: XOR<AgentUpdateWithoutPortfoliosInput, AgentUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<AgentCreateWithoutPortfoliosInput, AgentUncheckedCreateWithoutPortfoliosInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutPortfoliosInput, AgentUncheckedUpdateWithoutPortfoliosInput>
  }

  export type AgentUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutAgentNestedInput
    orders?: OrderUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUpdateManyWithoutAgentNestedInput
    comments?: CommentUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutAgentNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutAgentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type CompetitionUpsertWithoutPortfoliosInput = {
    update: XOR<CompetitionUpdateWithoutPortfoliosInput, CompetitionUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<CompetitionCreateWithoutPortfoliosInput, CompetitionUncheckedCreateWithoutPortfoliosInput>
    where?: CompetitionWhereInput
  }

  export type CompetitionUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: CompetitionWhereInput
    data: XOR<CompetitionUpdateWithoutPortfoliosInput, CompetitionUncheckedUpdateWithoutPortfoliosInput>
  }

  export type CompetitionUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutCompetitionNestedInput
  }

  export type CompetitionUncheckedUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutCompetitionNestedInput
  }

  export type PositionUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: PositionWhereUniqueInput
    update: XOR<PositionUpdateWithoutPortfolioInput, PositionUncheckedUpdateWithoutPortfolioInput>
    create: XOR<PositionCreateWithoutPortfolioInput, PositionUncheckedCreateWithoutPortfolioInput>
  }

  export type PositionUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: PositionWhereUniqueInput
    data: XOR<PositionUpdateWithoutPortfolioInput, PositionUncheckedUpdateWithoutPortfolioInput>
  }

  export type PositionUpdateManyWithWhereWithoutPortfolioInput = {
    where: PositionScalarWhereInput
    data: XOR<PositionUpdateManyMutationInput, PositionUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type PositionScalarWhereInput = {
    AND?: PositionScalarWhereInput | PositionScalarWhereInput[]
    OR?: PositionScalarWhereInput[]
    NOT?: PositionScalarWhereInput | PositionScalarWhereInput[]
    id?: StringFilter<"Position"> | string
    portfolioId?: StringFilter<"Position"> | string
    symbol?: StringFilter<"Position"> | string
    quantity?: FloatFilter<"Position"> | number
    avgCost?: FloatFilter<"Position"> | number
    currentPrice?: FloatNullableFilter<"Position"> | number | null
    boughtAt?: DateTimeFilter<"Position"> | Date | string
    updatedAt?: DateTimeFilter<"Position"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutPortfolioInput, OrderUncheckedUpdateWithoutPortfolioInput>
    create: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutPortfolioInput, OrderUncheckedUpdateWithoutPortfolioInput>
  }

  export type OrderUpdateManyWithWhereWithoutPortfolioInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type DailySettlementUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: DailySettlementWhereUniqueInput
    update: XOR<DailySettlementUpdateWithoutPortfolioInput, DailySettlementUncheckedUpdateWithoutPortfolioInput>
    create: XOR<DailySettlementCreateWithoutPortfolioInput, DailySettlementUncheckedCreateWithoutPortfolioInput>
  }

  export type DailySettlementUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: DailySettlementWhereUniqueInput
    data: XOR<DailySettlementUpdateWithoutPortfolioInput, DailySettlementUncheckedUpdateWithoutPortfolioInput>
  }

  export type DailySettlementUpdateManyWithWhereWithoutPortfolioInput = {
    where: DailySettlementScalarWhereInput
    data: XOR<DailySettlementUpdateManyMutationInput, DailySettlementUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type DailySettlementScalarWhereInput = {
    AND?: DailySettlementScalarWhereInput | DailySettlementScalarWhereInput[]
    OR?: DailySettlementScalarWhereInput[]
    NOT?: DailySettlementScalarWhereInput | DailySettlementScalarWhereInput[]
    id?: StringFilter<"DailySettlement"> | string
    portfolioId?: StringFilter<"DailySettlement"> | string
    date?: StringFilter<"DailySettlement"> | string
    cash?: FloatFilter<"DailySettlement"> | number
    positionJson?: StringNullableFilter<"DailySettlement"> | string | null
    positionDays?: IntFilter<"DailySettlement"> | number
    totalValue?: FloatFilter<"DailySettlement"> | number
    returnPct?: FloatFilter<"DailySettlement"> | number
    createdAt?: DateTimeFilter<"DailySettlement"> | Date | string
  }

  export type PortfolioCreateWithoutPositionsInput = {
    id?: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPortfoliosInput
    competition: CompetitionCreateNestedOneWithoutPortfoliosInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutPositionsInput = {
    id?: string
    agentId: string
    competitionId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutPositionsInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutPositionsInput, PortfolioUncheckedCreateWithoutPositionsInput>
  }

  export type PortfolioUpsertWithoutPositionsInput = {
    update: XOR<PortfolioUpdateWithoutPositionsInput, PortfolioUncheckedUpdateWithoutPositionsInput>
    create: XOR<PortfolioCreateWithoutPositionsInput, PortfolioUncheckedCreateWithoutPositionsInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutPositionsInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutPositionsInput, PortfolioUncheckedUpdateWithoutPositionsInput>
  }

  export type PortfolioUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPortfoliosNestedInput
    competition?: CompetitionUpdateOneRequiredWithoutPortfoliosNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type AgentCreateWithoutTradesInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutAgentInput
    orders?: OrderCreateNestedManyWithoutAgentInput
    logs?: LogEntryCreateNestedManyWithoutAgentInput
    comments?: CommentCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutTradesInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutAgentInput
    orders?: OrderUncheckedCreateNestedManyWithoutAgentInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutAgentInput
    comments?: CommentUncheckedCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutTradesInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutTradesInput, AgentUncheckedCreateWithoutTradesInput>
  }

  export type AgentUpsertWithoutTradesInput = {
    update: XOR<AgentUpdateWithoutTradesInput, AgentUncheckedUpdateWithoutTradesInput>
    create: XOR<AgentCreateWithoutTradesInput, AgentUncheckedCreateWithoutTradesInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutTradesInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutTradesInput, AgentUncheckedUpdateWithoutTradesInput>
  }

  export type AgentUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutAgentNestedInput
    orders?: OrderUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUpdateManyWithoutAgentNestedInput
    comments?: CommentUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutAgentNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutAgentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type DeliveryCreateWithoutLobsterInput = {
    id?: string
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutDeliveriesInput
  }

  export type DeliveryUncheckedCreateWithoutLobsterInput = {
    id?: string
    agentId: string
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
  }

  export type DeliveryCreateOrConnectWithoutLobsterInput = {
    where: DeliveryWhereUniqueInput
    create: XOR<DeliveryCreateWithoutLobsterInput, DeliveryUncheckedCreateWithoutLobsterInput>
  }

  export type DeliveryCreateManyLobsterInputEnvelope = {
    data: DeliveryCreateManyLobsterInput | DeliveryCreateManyLobsterInput[]
  }

  export type CommentCreateWithoutLobsterInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    createdAt?: Date | string
    agent?: AgentCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutLobsterInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    agentId?: string | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutLobsterInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutLobsterInput, CommentUncheckedCreateWithoutLobsterInput>
  }

  export type CommentCreateManyLobsterInputEnvelope = {
    data: CommentCreateManyLobsterInput | CommentCreateManyLobsterInput[]
  }

  export type LogEntryCreateWithoutLobsterInput = {
    id?: string
    title: string
    content: string
    level?: string
    createdAt?: Date | string
    agent?: AgentCreateNestedOneWithoutLogsInput
  }

  export type LogEntryUncheckedCreateWithoutLobsterInput = {
    id?: string
    title: string
    content: string
    level?: string
    agentId?: string | null
    createdAt?: Date | string
  }

  export type LogEntryCreateOrConnectWithoutLobsterInput = {
    where: LogEntryWhereUniqueInput
    create: XOR<LogEntryCreateWithoutLobsterInput, LogEntryUncheckedCreateWithoutLobsterInput>
  }

  export type LogEntryCreateManyLobsterInputEnvelope = {
    data: LogEntryCreateManyLobsterInput | LogEntryCreateManyLobsterInput[]
  }

  export type DeliveryUpsertWithWhereUniqueWithoutLobsterInput = {
    where: DeliveryWhereUniqueInput
    update: XOR<DeliveryUpdateWithoutLobsterInput, DeliveryUncheckedUpdateWithoutLobsterInput>
    create: XOR<DeliveryCreateWithoutLobsterInput, DeliveryUncheckedCreateWithoutLobsterInput>
  }

  export type DeliveryUpdateWithWhereUniqueWithoutLobsterInput = {
    where: DeliveryWhereUniqueInput
    data: XOR<DeliveryUpdateWithoutLobsterInput, DeliveryUncheckedUpdateWithoutLobsterInput>
  }

  export type DeliveryUpdateManyWithWhereWithoutLobsterInput = {
    where: DeliveryScalarWhereInput
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyWithoutLobsterInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutLobsterInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutLobsterInput, CommentUncheckedUpdateWithoutLobsterInput>
    create: XOR<CommentCreateWithoutLobsterInput, CommentUncheckedCreateWithoutLobsterInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutLobsterInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutLobsterInput, CommentUncheckedUpdateWithoutLobsterInput>
  }

  export type CommentUpdateManyWithWhereWithoutLobsterInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutLobsterInput>
  }

  export type LogEntryUpsertWithWhereUniqueWithoutLobsterInput = {
    where: LogEntryWhereUniqueInput
    update: XOR<LogEntryUpdateWithoutLobsterInput, LogEntryUncheckedUpdateWithoutLobsterInput>
    create: XOR<LogEntryCreateWithoutLobsterInput, LogEntryUncheckedCreateWithoutLobsterInput>
  }

  export type LogEntryUpdateWithWhereUniqueWithoutLobsterInput = {
    where: LogEntryWhereUniqueInput
    data: XOR<LogEntryUpdateWithoutLobsterInput, LogEntryUncheckedUpdateWithoutLobsterInput>
  }

  export type LogEntryUpdateManyWithWhereWithoutLobsterInput = {
    where: LogEntryScalarWhereInput
    data: XOR<LogEntryUpdateManyMutationInput, LogEntryUncheckedUpdateManyWithoutLobsterInput>
  }

  export type AgentCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioCreateNestedManyWithoutAgentInput
    orders?: OrderCreateNestedManyWithoutAgentInput
    logs?: LogEntryCreateNestedManyWithoutAgentInput
    comments?: CommentCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutAgentInput
    orders?: OrderUncheckedCreateNestedManyWithoutAgentInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutAgentInput
    comments?: CommentUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutDeliveriesInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutDeliveriesInput, AgentUncheckedCreateWithoutDeliveriesInput>
  }

  export type LobsterCreateWithoutDeliveriesInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutLobsterInput
    logs?: LogEntryCreateNestedManyWithoutLobsterInput
  }

  export type LobsterUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutLobsterInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutLobsterInput
  }

  export type LobsterCreateOrConnectWithoutDeliveriesInput = {
    where: LobsterWhereUniqueInput
    create: XOR<LobsterCreateWithoutDeliveriesInput, LobsterUncheckedCreateWithoutDeliveriesInput>
  }

  export type AgentUpsertWithoutDeliveriesInput = {
    update: XOR<AgentUpdateWithoutDeliveriesInput, AgentUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<AgentCreateWithoutDeliveriesInput, AgentUncheckedCreateWithoutDeliveriesInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutDeliveriesInput, AgentUncheckedUpdateWithoutDeliveriesInput>
  }

  export type AgentUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUpdateManyWithoutAgentNestedInput
    orders?: OrderUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUpdateManyWithoutAgentNestedInput
    comments?: CommentUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutAgentNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutAgentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type LobsterUpsertWithoutDeliveriesInput = {
    update: XOR<LobsterUpdateWithoutDeliveriesInput, LobsterUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<LobsterCreateWithoutDeliveriesInput, LobsterUncheckedCreateWithoutDeliveriesInput>
    where?: LobsterWhereInput
  }

  export type LobsterUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: LobsterWhereInput
    data: XOR<LobsterUpdateWithoutDeliveriesInput, LobsterUncheckedUpdateWithoutDeliveriesInput>
  }

  export type LobsterUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutLobsterNestedInput
    logs?: LogEntryUpdateManyWithoutLobsterNestedInput
  }

  export type LobsterUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutLobsterNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutLobsterNestedInput
  }

  export type LobsterCreateWithoutCommentsInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryCreateNestedManyWithoutLobsterInput
    logs?: LogEntryCreateNestedManyWithoutLobsterInput
  }

  export type LobsterUncheckedCreateWithoutCommentsInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutLobsterInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutLobsterInput
  }

  export type LobsterCreateOrConnectWithoutCommentsInput = {
    where: LobsterWhereUniqueInput
    create: XOR<LobsterCreateWithoutCommentsInput, LobsterUncheckedCreateWithoutCommentsInput>
  }

  export type AgentCreateWithoutCommentsInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioCreateNestedManyWithoutAgentInput
    orders?: OrderCreateNestedManyWithoutAgentInput
    logs?: LogEntryCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutCommentsInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutAgentInput
    orders?: OrderUncheckedCreateNestedManyWithoutAgentInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutCommentsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutCommentsInput, AgentUncheckedCreateWithoutCommentsInput>
  }

  export type LobsterUpsertWithoutCommentsInput = {
    update: XOR<LobsterUpdateWithoutCommentsInput, LobsterUncheckedUpdateWithoutCommentsInput>
    create: XOR<LobsterCreateWithoutCommentsInput, LobsterUncheckedCreateWithoutCommentsInput>
    where?: LobsterWhereInput
  }

  export type LobsterUpdateToOneWithWhereWithoutCommentsInput = {
    where?: LobsterWhereInput
    data: XOR<LobsterUpdateWithoutCommentsInput, LobsterUncheckedUpdateWithoutCommentsInput>
  }

  export type LobsterUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUpdateManyWithoutLobsterNestedInput
    logs?: LogEntryUpdateManyWithoutLobsterNestedInput
  }

  export type LobsterUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutLobsterNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutLobsterNestedInput
  }

  export type AgentUpsertWithoutCommentsInput = {
    update: XOR<AgentUpdateWithoutCommentsInput, AgentUncheckedUpdateWithoutCommentsInput>
    create: XOR<AgentCreateWithoutCommentsInput, AgentUncheckedCreateWithoutCommentsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutCommentsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutCommentsInput, AgentUncheckedUpdateWithoutCommentsInput>
  }

  export type AgentUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUpdateManyWithoutAgentNestedInput
    orders?: OrderUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutAgentNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type LobsterCreateWithoutLogsInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryCreateNestedManyWithoutLobsterInput
    comments?: CommentCreateNestedManyWithoutLobsterInput
  }

  export type LobsterUncheckedCreateWithoutLogsInput = {
    id?: string
    key: $Enums.LobsterKey
    name: string
    description?: string | null
    color?: string | null
    isActive?: boolean
    agentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutLobsterInput
    comments?: CommentUncheckedCreateNestedManyWithoutLobsterInput
  }

  export type LobsterCreateOrConnectWithoutLogsInput = {
    where: LobsterWhereUniqueInput
    create: XOR<LobsterCreateWithoutLogsInput, LobsterUncheckedCreateWithoutLogsInput>
  }

  export type AgentCreateWithoutLogsInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioCreateNestedManyWithoutAgentInput
    orders?: OrderCreateNestedManyWithoutAgentInput
    comments?: CommentCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutLogsInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutAgentInput
    orders?: OrderUncheckedCreateNestedManyWithoutAgentInput
    comments?: CommentUncheckedCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutLogsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutLogsInput, AgentUncheckedCreateWithoutLogsInput>
  }

  export type LobsterUpsertWithoutLogsInput = {
    update: XOR<LobsterUpdateWithoutLogsInput, LobsterUncheckedUpdateWithoutLogsInput>
    create: XOR<LobsterCreateWithoutLogsInput, LobsterUncheckedCreateWithoutLogsInput>
    where?: LobsterWhereInput
  }

  export type LobsterUpdateToOneWithWhereWithoutLogsInput = {
    where?: LobsterWhereInput
    data: XOR<LobsterUpdateWithoutLogsInput, LobsterUncheckedUpdateWithoutLogsInput>
  }

  export type LobsterUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUpdateManyWithoutLobsterNestedInput
    comments?: CommentUpdateManyWithoutLobsterNestedInput
  }

  export type LobsterUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumLobsterKeyFieldUpdateOperationsInput | $Enums.LobsterKey
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: DeliveryUncheckedUpdateManyWithoutLobsterNestedInput
    comments?: CommentUncheckedUpdateManyWithoutLobsterNestedInput
  }

  export type AgentUpsertWithoutLogsInput = {
    update: XOR<AgentUpdateWithoutLogsInput, AgentUncheckedUpdateWithoutLogsInput>
    create: XOR<AgentCreateWithoutLogsInput, AgentUncheckedCreateWithoutLogsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutLogsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutLogsInput, AgentUncheckedUpdateWithoutLogsInput>
  }

  export type AgentUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUpdateManyWithoutAgentNestedInput
    orders?: OrderUpdateManyWithoutAgentNestedInput
    comments?: CommentUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutAgentNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAgentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateWithoutOrdersInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioCreateNestedManyWithoutAgentInput
    logs?: LogEntryCreateNestedManyWithoutAgentInput
    comments?: CommentCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    apiKey: string
    secretHash: string
    status?: $Enums.AgentStatus
    avatar?: string | null
    description?: string | null
    model?: string | null
    market?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutAgentInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutAgentInput
    logs?: LogEntryUncheckedCreateNestedManyWithoutAgentInput
    comments?: CommentUncheckedCreateNestedManyWithoutAgentInput
    deliveries?: DeliveryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutOrdersInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutOrdersInput, AgentUncheckedCreateWithoutOrdersInput>
  }

  export type CompetitionCreateWithoutOrdersInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CompetitionStatus
    startAt?: Date | string | null
    endAt?: Date | string | null
    initialCash?: number
    market?: string
    testMode?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioCreateNestedManyWithoutCompetitionInput
  }

  export type CompetitionUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CompetitionStatus
    startAt?: Date | string | null
    endAt?: Date | string | null
    initialCash?: number
    market?: string
    testMode?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutCompetitionInput
  }

  export type CompetitionCreateOrConnectWithoutOrdersInput = {
    where: CompetitionWhereUniqueInput
    create: XOR<CompetitionCreateWithoutOrdersInput, CompetitionUncheckedCreateWithoutOrdersInput>
  }

  export type PortfolioCreateWithoutOrdersInput = {
    id?: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPortfoliosInput
    competition: CompetitionCreateNestedOneWithoutPortfoliosInput
    positions?: PositionCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutOrdersInput = {
    id?: string
    agentId: string
    competitionId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutPortfolioInput
    settlements?: DailySettlementUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutOrdersInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
  }

  export type AgentUpsertWithoutOrdersInput = {
    update: XOR<AgentUpdateWithoutOrdersInput, AgentUncheckedUpdateWithoutOrdersInput>
    create: XOR<AgentCreateWithoutOrdersInput, AgentUncheckedCreateWithoutOrdersInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutOrdersInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutOrdersInput, AgentUncheckedUpdateWithoutOrdersInput>
  }

  export type AgentUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUpdateManyWithoutAgentNestedInput
    comments?: CommentUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    secretHash?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    market?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutAgentNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutAgentNestedInput
    logs?: LogEntryUncheckedUpdateManyWithoutAgentNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAgentNestedInput
    deliveries?: DeliveryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type CompetitionUpsertWithoutOrdersInput = {
    update: XOR<CompetitionUpdateWithoutOrdersInput, CompetitionUncheckedUpdateWithoutOrdersInput>
    create: XOR<CompetitionCreateWithoutOrdersInput, CompetitionUncheckedCreateWithoutOrdersInput>
    where?: CompetitionWhereInput
  }

  export type CompetitionUpdateToOneWithWhereWithoutOrdersInput = {
    where?: CompetitionWhereInput
    data: XOR<CompetitionUpdateWithoutOrdersInput, CompetitionUncheckedUpdateWithoutOrdersInput>
  }

  export type CompetitionUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUpdateManyWithoutCompetitionNestedInput
  }

  export type CompetitionUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCompetitionStatusFieldUpdateOperationsInput | $Enums.CompetitionStatus
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialCash?: FloatFieldUpdateOperationsInput | number
    market?: StringFieldUpdateOperationsInput | string
    testMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutCompetitionNestedInput
  }

  export type PortfolioUpsertWithoutOrdersInput = {
    update: XOR<PortfolioUpdateWithoutOrdersInput, PortfolioUncheckedUpdateWithoutOrdersInput>
    create: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutOrdersInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutOrdersInput, PortfolioUncheckedUpdateWithoutOrdersInput>
  }

  export type PortfolioUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPortfoliosNestedInput
    competition?: CompetitionUpdateOneRequiredWithoutPortfoliosNestedInput
    positions?: PositionUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioCreateWithoutSettlementsInput = {
    id?: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPortfoliosInput
    competition: CompetitionCreateNestedOneWithoutPortfoliosInput
    positions?: PositionCreateNestedManyWithoutPortfolioInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutSettlementsInput = {
    id?: string
    agentId: string
    competitionId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: PositionUncheckedCreateNestedManyWithoutPortfolioInput
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutSettlementsInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutSettlementsInput, PortfolioUncheckedCreateWithoutSettlementsInput>
  }

  export type PortfolioUpsertWithoutSettlementsInput = {
    update: XOR<PortfolioUpdateWithoutSettlementsInput, PortfolioUncheckedUpdateWithoutSettlementsInput>
    create: XOR<PortfolioCreateWithoutSettlementsInput, PortfolioUncheckedCreateWithoutSettlementsInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutSettlementsInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutSettlementsInput, PortfolioUncheckedUpdateWithoutSettlementsInput>
  }

  export type PortfolioUpdateWithoutSettlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPortfoliosNestedInput
    competition?: CompetitionUpdateOneRequiredWithoutPortfoliosNestedInput
    positions?: PositionUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutSettlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type TradeCreateManyAgentInput = {
    id?: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    price: number
    status?: $Enums.TradeStatus
    filledAt?: Date | string | null
    executedPrice?: number | null
    note?: string | null
    commission?: number | null
    stampTax?: number | null
    transferFee?: number | null
    netAmount?: number | null
    createdAt?: Date | string
  }

  export type PortfolioCreateManyAgentInput = {
    id?: string
    competitionId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyAgentInput = {
    id?: string
    competitionId: string
    portfolioId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type LogEntryCreateManyAgentInput = {
    id?: string
    title: string
    content: string
    level?: string
    lobsterId?: string | null
    createdAt?: Date | string
  }

  export type CommentCreateManyAgentInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    lobsterId?: string | null
    createdAt?: Date | string
  }

  export type DeliveryCreateManyAgentInput = {
    id?: string
    lobsterId?: string | null
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
  }

  export type TradeUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    commission?: NullableFloatFieldUpdateOperationsInput | number | null
    stampTax?: NullableFloatFieldUpdateOperationsInput | number | null
    transferFee?: NullableFloatFieldUpdateOperationsInput | number | null
    netAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    commission?: NullableFloatFieldUpdateOperationsInput | number | null
    stampTax?: NullableFloatFieldUpdateOperationsInput | number | null
    transferFee?: NullableFloatFieldUpdateOperationsInput | number | null
    netAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumTradeStatusFieldUpdateOperationsInput | $Enums.TradeStatus
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executedPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    commission?: NullableFloatFieldUpdateOperationsInput | number | null
    stampTax?: NullableFloatFieldUpdateOperationsInput | number | null
    transferFee?: NullableFloatFieldUpdateOperationsInput | number | null
    netAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    competition?: CompetitionUpdateOneRequiredWithoutPortfoliosNestedInput
    positions?: PositionUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    competition?: CompetitionUpdateOneRequiredWithoutOrdersNestedInput
    portfolio?: PortfolioUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LogEntryUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lobster?: LobsterUpdateOneWithoutLogsNestedInput
  }

  export type LogEntryUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lobster?: LobsterUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lobster?: LobsterUpdateOneWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    lobsterId?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateManyCompetitionInput = {
    id?: string
    agentId: string
    cash?: number
    totalValue?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyCompetitionInput = {
    id?: string
    agentId: string
    portfolioId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type PortfolioUpdateWithoutCompetitionInput = {
    id?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPortfoliosNestedInput
    positions?: PositionUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutCompetitionInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: PositionUncheckedUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
    settlements?: DailySettlementUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateManyWithoutCompetitionInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutCompetitionInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent?: AgentUpdateOneRequiredWithoutOrdersNestedInput
    portfolio?: PortfolioUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutCompetitionInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderUncheckedUpdateManyWithoutCompetitionInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PositionCreateManyPortfolioInput = {
    id?: string
    symbol: string
    quantity: number
    avgCost: number
    currentPrice?: number | null
    boughtAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyPortfolioInput = {
    id?: string
    agentId: string
    competitionId: string
    symbol: string
    side: $Enums.TradeSide
    quantity: number
    note?: string | null
    status?: string
    rejectReason?: string | null
    submittedAt?: Date | string
    matchedAt?: Date | string | null
  }

  export type DailySettlementCreateManyPortfolioInput = {
    id?: string
    date: string
    cash: number
    positionJson?: string | null
    positionDays?: number
    totalValue: number
    returnPct: number
    createdAt?: Date | string
  }

  export type PositionUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    avgCost?: FloatFieldUpdateOperationsInput | number
    currentPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    boughtAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    avgCost?: FloatFieldUpdateOperationsInput | number
    currentPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    boughtAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    avgCost?: FloatFieldUpdateOperationsInput | number
    currentPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    boughtAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent?: AgentUpdateOneRequiredWithoutOrdersNestedInput
    competition?: CompetitionUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    competitionId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumTradeSideFieldUpdateOperationsInput | $Enums.TradeSide
    quantity?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DailySettlementUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    positionJson?: NullableStringFieldUpdateOperationsInput | string | null
    positionDays?: IntFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    returnPct?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailySettlementUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    positionJson?: NullableStringFieldUpdateOperationsInput | string | null
    positionDays?: IntFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    returnPct?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailySettlementUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    cash?: FloatFieldUpdateOperationsInput | number
    positionJson?: NullableStringFieldUpdateOperationsInput | string | null
    positionDays?: IntFieldUpdateOperationsInput | number
    totalValue?: FloatFieldUpdateOperationsInput | number
    returnPct?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateManyLobsterInput = {
    id?: string
    agentId: string
    symbol: string
    side: $Enums.DeliverySide
    quantity: number
    price: number
    deliveredAt: Date | string
    note?: string | null
    createdAt?: Date | string
  }

  export type CommentCreateManyLobsterInput = {
    id?: string
    author: string
    content: string
    sentiment?: number | null
    agentId?: string | null
    createdAt?: Date | string
  }

  export type LogEntryCreateManyLobsterInput = {
    id?: string
    title: string
    content: string
    level?: string
    agentId?: string | null
    createdAt?: Date | string
  }

  export type DeliveryUpdateWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type DeliveryUncheckedUpdateWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumDeliverySideFieldUpdateOperationsInput | $Enums.DeliverySide
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sentiment?: NullableIntFieldUpdateOperationsInput | number | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryUpdateWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneWithoutLogsNestedInput
  }

  export type LogEntryUncheckedUpdateWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryUncheckedUpdateManyWithoutLobsterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}