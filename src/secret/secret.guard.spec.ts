import { SecretGuard } from './secret.guard';

describe('SecretGuard', () => {
  it('should be defined', () => {
    expect(new SecretGuard()).toBeDefined();
  });
});
