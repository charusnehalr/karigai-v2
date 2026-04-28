import { describe, it, expect } from 'vitest';
import { evaluateRules } from './evaluator';
import type { Rule, UserContext } from './types';
import rulesV1 from '../v1/rules.json';

const rules = rulesV1 as Rule[];

const baseCtx: UserContext = {
  userId: 'test-user',
  conditions: [],
  pregnancyStatus: 'NO',
  symptoms: [],
  injuries: [],
};

describe('R-029 — Heavy bleeding + dizziness → urgent flag', () => {
  it('triggers when heavy flow + dizziness + 1+ day', () => {
    const ctx: UserContext = {
      ...baseCtx,
      cycleFlow: 'heavy',
      symptoms: ['dizziness'],
      cycleDurationDays: 1,
    };
    const result = evaluateRules(rules, ctx);
    expect(result.hasUrgentFlag).toBe(true);
    const r029 = result.triggered.find(t => t.rule.id === 'R-029');
    expect(r029).toBeDefined();
  });

  it('does not trigger when flow is medium', () => {
    const ctx: UserContext = {
      ...baseCtx,
      cycleFlow: 'medium',
      symptoms: ['dizziness'],
      cycleDurationDays: 1,
    };
    const result = evaluateRules(rules, ctx);
    const r029 = result.triggered.find(t => t.rule.id === 'R-029');
    expect(r029).toBeUndefined();
  });
});

describe('R-041 — Calorie intake < 900 kcal', () => {
  it('triggers urgent flag when avgKcal7d < 900', () => {
    const ctx: UserContext = { ...baseCtx, avgKcal7d: 850 };
    const result = evaluateRules(rules, ctx);
    const r041 = result.triggered.find(t => t.rule.id === 'R-041');
    expect(r041).toBeDefined();
    expect(result.hasUrgentFlag).toBe(true);
  });

  it('does not trigger when avgKcal7d >= 900', () => {
    const ctx: UserContext = { ...baseCtx, avgKcal7d: 1200 };
    const result = evaluateRules(rules, ctx);
    const r041 = result.triggered.find(t => t.rule.id === 'R-041');
    expect(r041).toBeUndefined();
  });
});

describe('R-061 — Luteal phase reduces HIIT', () => {
  it('triggers workout adjustment in luteal phase', () => {
    const ctx: UserContext = { ...baseCtx, cyclePhase: 'luteal' };
    const result = evaluateRules(rules, ctx);
    const r061 = result.triggered.find(t => t.rule.id === 'R-061');
    expect(r061).toBeDefined();
    expect(r061?.action.workoutAdjustment).toBe('reduce_intensity');
  });

  it('does not trigger in follicular phase', () => {
    const ctx: UserContext = { ...baseCtx, cyclePhase: 'follicular' };
    const result = evaluateRules(rules, ctx);
    const r061 = result.triggered.find(t => t.rule.id === 'R-061');
    expect(r061).toBeUndefined();
  });
});

describe('R-007 — AI never recommends supplement doses', () => {
  it('triggers when response contains dosage phrasing', () => {
    const ctx: UserContext = {
      ...baseCtx,
      aiResponseText: 'Take 2000 IU of vitamin D daily.',
    };
    const result = evaluateRules(rules, ctx);
    const r007 = result.triggered.find(t => t.rule.id === 'R-007');
    expect(r007).toBeDefined();
  });

  it('does not trigger for clean AI response', () => {
    const ctx: UserContext = {
      ...baseCtx,
      aiResponseText: 'Focus on vitamin D rich foods like eggs and fatty fish.',
    };
    const result = evaluateRules(rules, ctx);
    const r007 = result.triggered.find(t => t.rule.id === 'R-007');
    expect(r007).toBeUndefined();
  });
});

describe('R-039 — ED history suppresses weight-loss plan', () => {
  it('triggers nutritionAdjustment for ED history', () => {
    const ctx: UserContext = { ...baseCtx, conditions: ['EATING_DISORDER'] };
    const result = evaluateRules(rules, ctx);
    const r039 = result.triggered.find(t => t.rule.id === 'R-039');
    expect(r039).toBeDefined();
    expect(r039?.action.nutritionAdjustment).toBe('ed_history_no_deficit');
  });
});

describe('R-026 — Pregnancy forbids weight-loss messaging', () => {
  it('triggers for pregnant users', () => {
    const ctx: UserContext = { ...baseCtx, pregnancyStatus: 'PREGNANT' };
    const result = evaluateRules(rules, ctx);
    const r026 = result.triggered.find(t => t.rule.id === 'R-026');
    expect(r026).toBeDefined();
  });

  it('does not trigger for non-pregnant users', () => {
    const ctx: UserContext = { ...baseCtx, pregnancyStatus: 'NO' };
    const result = evaluateRules(rules, ctx);
    const r026 = result.triggered.find(t => t.rule.id === 'R-026');
    expect(r026).toBeUndefined();
  });
});
