import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreChange, validateChange } from '../src/delivery_check.js';

const change = {
  name: 'ai-assisted-search',
  areas: ['frontend', 'backend', 'ai', 'tests', 'deployment'],
  checks: [
    { name: 'api contract', status: 'passed' },
    { name: 'prompt regression', status: 'passed' },
    { name: 'browser smoke', status: 'passed' }
  ]
};

test('accepts a complete full-stack AI change', () => {
  const result = scoreChange(change);
  assert.equal(result.ready, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.metrics.checks, 3);
});

test('rejects missing delivery areas', () => {
  const incomplete = { ...change, areas: ['frontend', 'ai'] };
  assert.deepEqual(validateChange(incomplete), ['missing area backend', 'missing area tests', 'missing area deployment']);
});

test('failed or skipped checks block release', () => {
  const blocked = { ...change, checks: [{ name: 'api contract', status: 'failed' }, { name: 'prompt regression', status: 'skipped' }] };
  const result = scoreChange(blocked);
  assert.equal(result.ready, false);
  assert.equal(result.metrics.failed, 1);
  assert.equal(result.metrics.skipped, 1);
});
