// Rule engine types — karigai

export type RuleCategory =
  | 'pcos'
  | 'prediabetes'
  | 'pregnancy_breastfeeding'
  | 'deficiency'
  | 'injury'
  | 'ed_risk'
  | 'cycle_adjustment'
  | 'red_flag'
  | 'ai_safety';

export type RuleSeverity = 'block' | 'adjust' | 'warn' | 'flag';

export type RuleStatus = 'draft' | 'staged' | 'live' | 'archived';

export interface Rule {
  id: string;              // "R-029"
  version: string;         // "1.0.0"
  category: RuleCategory;
  name: string;
  condition: RuleCondition;
  action: RuleAction;
  severity: RuleSeverity;
  requiresMedicalDisclaimer: boolean;
  status: RuleStatus;
  owner?: string;
}

export interface RuleCondition {
  // Cycle conditions
  cycleFlow?: FlowLevel | FlowLevel[];
  cyclePhase?: CyclePhase | CyclePhase[];
  cycleDurationDaysGte?: number;

  // Symptom conditions
  symptomsInclude?: string[];    // ANY of these must be present
  symptomsAll?: string[];        // ALL of these must be present

  // Nutrition conditions
  avgKcal7dLt?: number;
  avgKcal7dGt?: number;
  kcalBelowTargetDaysGte?: number;

  // Energy/fatigue
  energyScoreLte?: number;
  energyScoreGte?: number;

  // User condition flags
  hasCondition?: string[];       // ANY of these conditions
  pregnancyStatus?: string[];

  // Diet
  dietType?: string[];

  // Workout
  injuries?: string[];

  // AI response conditions (for ai_safety rules)
  aiResponseContains?: string[];  // check output for forbidden phrases
}

export interface RuleAction {
  // Plan adjustments
  workoutAdjustment?: 'reduce_intensity' | 'low_impact_only' | 'rest' | 'suppress' | 'backup_only';
  nutritionAdjustment?: string;

  // Safety
  createSafetyFlag?: { severity: 'urgent' | 'high' | 'review'; signal: string };
  showUrgentCareBanner?: boolean;
  showInterventionMessage?: boolean;

  // AI output
  blockAiResponse?: boolean;
  rewriteAiResponse?: string;    // instruction for rewrite
  addDisclaimer?: string;

  // Messages
  messageCode?: string;          // i18n key for user-facing message
  adminAlert?: boolean;
}

export type FlowLevel = 'spotting' | 'light' | 'medium' | 'heavy' | 'very_heavy';
export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation_estimate' | 'luteal';

// Context object passed to the rule evaluator
export interface UserContext {
  userId: string;
  conditions: string[];          // ConditionType[] from DB
  pregnancyStatus: string;
  cyclePhase?: CyclePhase;
  cycleDay?: number;
  cycleDurationDays?: number;
  cycleFlow?: FlowLevel;
  symptoms: string[];            // from today's + last 2 days symptom logs
  energyScore?: number;
  avgKcal7d?: number;
  kcalTarget?: number;
  kcalBelowTargetDays?: number;  // consecutive days below target
  dietType?: string;
  injuries: string[];
  // AI response content (for post-check)
  aiResponseText?: string;
}

export interface RuleEvaluationResult {
  triggered: TriggeredRule[];
  hasPlanBlock: boolean;
  hasAiBlock: boolean;
  hasUrgentFlag: boolean;
}

export interface TriggeredRule {
  rule: Rule;
  action: RuleAction;
}
