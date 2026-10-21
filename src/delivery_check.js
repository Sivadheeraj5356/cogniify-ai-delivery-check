const REQUIRED_AREAS = ['frontend', 'backend', 'ai', 'tests', 'deployment'];

export function validateChange(change) {
  const errors = [];
  if (!change || typeof change !== 'object') return ['change must be an object'];
  if (!change.name) errors.push('name is required');
  if (!Array.isArray(change.areas)) return ['areas must be an array'];
  const areas = new Set(change.areas || []);
  for (const area of REQUIRED_AREAS) {
    if (!areas.has(area)) errors.push(`missing area ${area}`);
  }
  if (!Array.isArray(change.checks) || change.checks.length === 0) {
    errors.push('at least one check is required');
  } else {
    for (const [index, check] of change.checks.entries()) {
      if (!check.name) errors.push(`checks[${index}].name is required`);
      if (!['passed', 'failed', 'skipped'].includes(check.status)) errors.push(`checks[${index}].status is invalid`);
    }
  }
  return errors;
}

export function scoreChange(change) {
  const errors = validateChange(change);
  const checks = change.checks || [];
  const failed = checks.filter((check) => check.status === 'failed').length;
  const skipped = checks.filter((check) => check.status === 'skipped').length;
  return {
    ready: errors.length === 0 && failed === 0 && skipped === 0,
    errors,
    metrics: { areas: new Set(change.areas || []).size, checks: checks.length, failed, skipped }
  };
}
