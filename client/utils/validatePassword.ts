export default function validatePassword(password: string): boolean {
  const passwordMinimum = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const passwordMid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const passwordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.trim().match(passwordMinimum)) return true;
  if (password.trim().match(passwordMid)) return true;
  if (password.trim().match(passwordStrong)) return true;

  return false;
}
