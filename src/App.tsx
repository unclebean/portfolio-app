import React, { useState } from "react";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Shield,
  Activity,
  RefreshCw,
  Zap,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Percent,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PageHeader,
  PortfolioPerformanceChart,
} from "@common/ui-lib";

interface Position {
  id: string;
  symbol: string;
  baseAsset: string;
  side: "LONG" | "SHORT";
  leverage: string;
  contracts: string;
  notionalValue: string;
  entryPrice: string;
  markPrice: string;
  liqPrice: string;
  margin: string;
  marginType: "Cross" | "Isolated";
  unrealizedPnl: string;
  unrealizedPnlUsd: number;
  roe: string;
  roePositive: boolean;
  tpSl: string;
}

const xrpAvaxPositions: Position[] = [
  {
    id: "pos-xrp",
    symbol: "XRPUSDT Perpetual",
    baseAsset: "XRP",
    side: "LONG",
    leverage: "10x",
    contracts: "45,000 XRP",
    notionalValue: "$110,475.00",
    entryPrice: "$2.2850",
    markPrice: "$2.4550",
    liqPrice: "$2.0520",
    margin: "$11,047.50",
    marginType: "Cross",
    unrealizedPnl: "+$7,650.00",
    unrealizedPnlUsd: 7650.0,
    roe: "+69.25%",
    roePositive: true,
    tpSl: "$2.8500 / $2.1800",
  },
  {
    id: "pos-avax",
    symbol: "AVAXUSDT Perpetual",
    baseAsset: "AVAX",
    side: "LONG",
    leverage: "8x",
    contracts: "2,200 AVAX",
    notionalValue: "$75,900.00",
    entryPrice: "$32.40",
    markPrice: "$34.50",
    liqPrice: "$28.35",
    margin: "$9,487.50",
    marginType: "Isolated",
    unrealizedPnl: "+$4,620.00",
    unrealizedPnlUsd: 4620.0,
    roe: "+48.70%",
    roePositive: true,
    tpSl: "$39.00 / $31.00",
  },
];

export default function App() {
  const [positions, setPositions] = useState<Position[]>(xrpAvaxPositions);
  const [balanceVisible, setBalanceVisible] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("positions");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const totalUnrealizedPnl = positions.reduce(
    (acc, pos) => acc + pos.unrealizedPnlUsd,
    0
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-5 md:p-6 space-y-5 min-w-0 bg-background text-foreground">
      {/* 1. Header with WebSocket status and Action Controls */}
      <PageHeader
        title="XRP & AVAX Trading Portfolio"
        description="实时双币种合约头寸监控、未实现盈亏流与保证金风险警报"
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">FEED ACTIVE (28ms)</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="h-9 gap-1.5 text-xs"
            >
              {balanceVisible ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              {balanceVisible ? "Hide Values" : "Show Values"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="h-9 w-9 p-0"
              title="Refresh Quotes"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin text-primary" : ""}`}
              />
            </Button>

            <Button size="sm" className="h-9 gap-1.5 font-medium shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              Adjust Collateral
            </Button>
          </div>
        }
      />

      {/* 2. Top Metric Cards (Aggregated XRP + AVAX Portfolio) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {/* Metric 1: Total Portfolio Net Equity */}
        <Card className="min-w-0 border-border shadow-xs">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Net Equity (USD)
            </CardTitle>
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Wallet className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold font-mono tracking-tight">
              {balanceVisible ? "$142,850.20" : "••••••••••"}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium">+$12,270.00</span>
              <span className="text-muted-foreground">(+9.40% 24h)</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Total Unrealized PnL */}
        <Card className="min-w-0 border-border shadow-xs">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Unrealized PnL
            </CardTitle>
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold font-mono tracking-tight text-emerald-500">
              {balanceVisible
                ? `+$${totalUnrealizedPnl.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`
                : "••••••••••"}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Badge
                variant="bullish"
                className="px-1.5 py-0 text-[11px] font-mono h-4.5"
              >
                Avg ROE +59.75%
              </Badge>
              <span>2 Open Positions</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Active Margin Used */}
        <Card className="min-w-0 border-border shadow-xs">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Margin Utilized
            </CardTitle>
            <div className="p-1.5 rounded-md bg-accent text-accent-foreground">
              <Percent className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold font-mono tracking-tight">
                {balanceVisible ? "$20,535.00" : "••••••••"}
              </div>
              <Badge
                variant="secondary"
                className="font-mono text-xs px-2 bg-muted text-foreground"
              >
                14.38% Ratio
              </Badge>
            </div>
            <div className="space-y-1">
              <Progress value={20.5} className="h-1.5" />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>Safe Buffer</span>
                <span>Max Cap: $142.8k</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Free Collateral */}
        <Card className="min-w-0 border-border shadow-xs">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Available Free Margin
            </CardTitle>
            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500">
              <Shield className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold font-mono tracking-tight">
              {balanceVisible ? "$122,315.20" : "••••••••••"}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <span className="text-emerald-500 font-medium">85.62%</span>
              <span>Available for add-on orders</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Split (8 cols Chart & Positions + 4 cols Dual Asset Health & Tickers) */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6 w-full items-start">
        {/* Left Column (8 cols): Portfolio Performance Chart & XRP/AVAX Position Table */}
        <div className="col-span-12 md:col-span-8 min-w-0 space-y-6">
          {/* Portfolio Performance Chart */}
          <PortfolioPerformanceChart className="w-full" />

          {/* Positions Table Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-semibold">
                    Active Positions (2)
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    XRP & AVAX 实时持仓标记价、清算安全带与快速止盈止损控制
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 border-rose-500/30"
                  >
                    Close All (2)
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <Tabs
                defaultValue="positions"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex items-center justify-between border-b border-border mb-3">
                  <TabsList className="bg-transparent p-0 h-auto gap-4 border-b-0">
                    <TabsTrigger
                      value="positions"
                      className="px-1 py-2 text-xs data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none font-medium"
                    >
                      Active Positions ({positions.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="orders"
                      className="px-1 py-2 text-xs data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none font-medium"
                    >
                      Limit Orders (1)
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="px-1 py-2 text-xs data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none font-medium"
                    >
                      Recent Fills
                    </TabsTrigger>
                  </TabsList>
                  <span className="text-[11px] text-muted-foreground hidden sm:inline-block font-mono">
                    Updated live
                  </span>
                </div>

                <TabsContent value="positions" className="m-0 focus-visible:outline-none">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-border text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                          <th className="py-2.5 px-3">Asset</th>
                          <th className="py-2.5 px-3">Position Size</th>
                          <th className="py-2.5 px-3">Entry Price</th>
                          <th className="py-2.5 px-3">Mark Price</th>
                          <th className="py-2.5 px-3 hidden lg:table-cell">Liq. Price</th>
                          <th className="py-2.5 px-3 hidden sm:table-cell">Margin</th>
                          <th className="py-2.5 px-3 text-right">PnL (ROE %)</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {positions.map((pos) => (
                          <tr
                            key={pos.id}
                            className="hover:bg-muted/40 transition-colors font-mono"
                          >
                            {/* Asset Symbol */}
                            <td className="py-3 px-3">
                              <div className="flex flex-col">
                                <span className="font-sans font-semibold text-foreground text-xs">
                                  {pos.symbol}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <Badge
                                    variant={pos.side === "LONG" ? "bullish" : "bearish"}
                                    className="px-1.5 py-0 text-[10px] font-mono h-4 uppercase"
                                  >
                                    {pos.side} {pos.leverage}
                                  </Badge>
                                  <span className="text-[10px] text-muted-foreground">
                                    {pos.marginType}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Position Size / Value */}
                            <td className="py-3 px-3">
                              <div className="font-medium text-foreground">
                                {pos.contracts}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                {pos.notionalValue}
                              </div>
                            </td>

                            {/* Entry Price */}
                            <td className="py-3 px-3 text-muted-foreground">
                              {pos.entryPrice}
                            </td>

                            {/* Mark Price */}
                            <td className="py-3 px-3 font-semibold text-foreground">
                              {pos.markPrice}
                            </td>

                            {/* Liq Price */}
                            <td className="py-3 px-3 hidden lg:table-cell text-amber-500 font-medium">
                              {pos.liqPrice}
                            </td>

                            {/* Margin */}
                            <td className="py-3 px-3 hidden sm:table-cell text-muted-foreground">
                              {pos.margin}
                            </td>

                            {/* PnL & ROE */}
                            <td className="py-3 px-3 text-right">
                              <div
                                className={`font-semibold ${
                                  pos.roePositive ? "text-emerald-500" : "text-rose-500"
                                }`}
                              >
                                {pos.unrealizedPnl}
                              </div>
                              <div
                                className={`text-[11px] ${
                                  pos.roePositive
                                    ? "text-emerald-500/80"
                                    : "text-rose-500/80"
                                }`}
                              >
                                {pos.roe}
                              </div>
                            </td>

                            {/* Quick Actions */}
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-[11px]"
                                >
                                  TP/SL
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-7 px-2 text-[11px] font-sans"
                                >
                                  Close
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="m-0 focus-visible:outline-none">
                  <div className="p-4 rounded-md bg-muted/20 border border-border/50 text-xs font-mono space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">
                        XRPUSDT Limit Buy
                      </span>
                      <span className="text-emerald-500">OPEN</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Price: $2.1500</span>
                      <span>Amount: 15,000 XRP ($32,250.00)</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="m-0 focus-visible:outline-none">
                  <div className="py-6 text-center text-muted-foreground text-xs font-mono">
                    All executions settled within standard slip tolerances.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (4 cols): Dual Asset Exposure & Real-Time Price Watch */}
        <div className="col-span-12 md:col-span-4 min-w-0 space-y-6">
          {/* Dual Asset Exposure Breakdown */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span>Holdings Exposure</span>
                <span className="text-xs font-normal text-muted-foreground font-mono">
                  $186,375.00 Total
                </span>
              </CardTitle>
              <CardDescription className="text-xs">
                当前投资组合中 XRP 与 AVAX 头寸价值占比
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* XRP Allocation */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
                    XRP (Ripple)
                  </span>
                  <span className="text-foreground font-semibold">59.28%</span>
                </div>
                <Progress value={59.28} className="h-2" />
                <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                  <span>$110,475.00 Notional</span>
                  <span>10x Leverage</span>
                </div>
              </div>

              {/* AVAX Allocation */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" />
                    AVAX (Avalanche)
                  </span>
                  <span className="text-foreground font-semibold">40.72%</span>
                </div>
                <Progress value={40.72} className="h-2" />
                <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                  <span>$75,900.00 Notional</span>
                  <span>8x Leverage</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span>Net Leverage Multiplier:</span>
                  <span className="text-foreground font-bold">1.30x on Equity</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Ticker for XRP & AVAX */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary" />
                  Live Tickers (XRP & AVAX)
                </CardTitle>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  Binance / Bybit Avg
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50 text-xs">
                {/* XRP Ticker */}
                <div className="p-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      XRP / USDT
                      <span className="text-[10px] font-mono bg-blue-500/10 text-blue-500 px-1 rounded">
                        PERP
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                      Funding: +0.0125% (in 3h)
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="font-bold text-foreground text-sm">$2.4550</div>
                    <div className="text-emerald-500 text-[11px] flex items-center justify-end font-medium">
                      <ArrowUpRight className="w-3 h-3" /> +7.44%
                    </div>
                  </div>
                </div>

                {/* AVAX Ticker */}
                <div className="p-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      AVAX / USDT
                      <span className="text-[10px] font-mono bg-rose-500/10 text-rose-500 px-1 rounded">
                        PERP
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                      Funding: +0.0090% (in 3h)
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="font-bold text-foreground text-sm">$34.50</div>
                    <div className="text-emerald-500 text-[11px] flex items-center justify-end font-medium">
                      <ArrowUpRight className="w-3 h-3" /> +6.48%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liquidation & Safety Guard Card */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Liquidation Safety Buffer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center font-mono">
                <span className="text-muted-foreground">XRP Drop to Liq:</span>
                <span className="font-semibold text-emerald-500">-16.41% ($2.0520)</span>
              </div>
              <div className="flex justify-between items-center font-mono">
                <span className="text-muted-foreground">AVAX Drop to Liq:</span>
                <span className="font-semibold text-emerald-500">-17.82% ($28.35)</span>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 mt-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Configure XRP / AVAX Auto-Margin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
