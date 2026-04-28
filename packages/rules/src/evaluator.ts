// Rule evaluator — pure function, no side effects
// Takes user context + rule set → returns triggered rules + actions

import type {
  Rule,
  RuleCondition,
  UserContext,
  RuleEvaluationResult,
  TriggeredRule,
} from './types';

function conditionMatches(condition: RuleCondition, ctx: UserContext): boolean {
  // Cycle flow check
  if (condition.cycleFlow) {
    const flows = Array.isArray(condition.cycleFlow) ? condition.cycleFlow : [condition.cycleFlow];
    if (!ctx.cycleFlow || !flows.includes(ctx.cycleFlow)) return false;
  }

  // Cycle phase check
  if (condition.cyclePhase) {
    const phases = Array.isArray(condition.cyclePhase) ? condition.cyclePhase : [condition.cyclePhase];
    if (!ctx.cyclePhase || !phases.includes(ctx.cyclePhase)) return false;
  }

  // Cycle duration
  if (condition.cycleDurationDaysGte !== undefined) {
    if ((ctx.cycleDurationDays ?? 0) < condition.cycleDurationDaysGte) return false;
  }

  // Symptom checks — ANY
  if (condition.symptomsInclude && condition.symptomsInclude.length > 0) {
    const hasAny = condition.symptomsInclude.some(s => ctx.symptoms.includes(s));
    if (!hasAny) return false;
  }

  // Symptom checks — ALL
  if (condition.symptomsAll && condition.symptomsAll.length > 0) {
    const hasAll = condition.symptomsAll.every(s => ctx.symptoms.includes(s));
    if (!hasAll) return false;
  }

  // Nutrition checks
  if (condition.avgKcal7dLt !== undefined) {
    if ((ctx.avgKcal7d ?? Infinity) >= condition.avgKcal7dLt) return false;
  }
  if (condition.avgKcal7dGt !== undefined) {
    if ((ctx.avgKcal7d ?? 0) <= condition.avgKcal7dGt) return false;
  }
  if (condition.kcalBelowTargetDaysGte !== undefined) {
    if ((ctx.kcalBelowTargetDays ?? 0) < condition.kcalBelowTargetDaysGte) return false;
  }

  // Energy score
  if (condition.energyScoreLte !== undefined) {
    if ((ctx.energyScore ?? 10) > condition.energyScoreLte) return false;
  }
  if (condition.energyScoreGte !== undefined) {
    if ((ctx.energyScore ?? 0) < condition.energyScoreGte) return false;
  }

  // User health conditions — ANY
  if (condition.hasCondition && condition.hasCondition.length > 0) {
    const hasAny = condition.hasCondition.some(c => ctx.conditions.includes(c));
    if (!hasAny) return false;
  }

  // Pregnancy status
  if (condition.pregnancyStatus && condition.pregnancyStatus.length > 0) {
    if (!condition.pregnancyStatus.includes(ctx.pregnancyStatus)) return false;
  }

  // Diet type
  if (condition.dietType && condition.dietType.length > 0) {
    if (!ctx.dietType || !condition.dietType.includes(ctx.dietType)) return false;
  }

  // Injuries — ANY
  if (condition.injuries && condition.injuries.length > 0) {
    const hasAny = condition.injuries.some(i => ctx.injuries.includes(i));
    if (!hasAny) return false;
  }

  // AI response content check — ANY forbidden phrase
  if (condition.aiResponseContains && condition.aiResponseContains.length > 0) {
    if (!ctx.aiResponseText) return false;
    const lower = ctx.aiResponseText.toLowerCase();
    const hasAny = condition.aiResponseContains.some(phrase => lower.includes(phrase.toLowerCase()));
    if (!hasAny) return false;
  }

  return true;
}

export function evaluateRules(rules: Rule[], ctx: UserContext): RuleEvaluationResult {
  const triggered: TriggeredRule[] = [];

  for (const rule of rules) {
    if (rule.status !== 'live') continue;
    if (conditionMatches(rule.condition, ctx)) {
      triggered.push({ rule, action: rule.action });
    }
  }

  const hasPlanBlock = triggered.some(
    t => t.action.workoutAdjustment === 'suppress' || t.action.workoutAdjustment === 'rest'
  );
  const hasAiBlock = triggered.some(t => t.action.blockAiResponse === true);
  const hasUrgentFlag = triggered.some(
    t => t.action.createSafetyFlag?.severity === 'urgent'
  );

  return { triggered, hasPlanBlock, hasAiBlock, hasUrgentFlag };
}
