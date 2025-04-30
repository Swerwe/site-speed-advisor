export interface PerfMetrics {
    lcp: LCPMetrics;
    tbt: TBTMetrics;
  }
  
  export interface LCPMetrics {
    value: number;
    lcpElementType?: string | null;
    lcpElementTag?: string | null;
    lcpElementUrl?: string | null;
    isPreloaded?: boolean;
    isModernFormat?: boolean;
  }
  
  export interface TBTMetrics {
    value: number;
    longTasks: LongTask[];
    scripts: ScriptMetrics;
    mainThreadBlocks: number;
  }
  
  export interface LongTask {
    duration: number;
    startTime: number;
    name: string;
  }
  
  export interface ScriptMetrics {
    withDefer: number;
    withAsync: number;
    total: number;
  }