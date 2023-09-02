export const validatePhone = (_, phone) => {
  phone = phone.trim();
  let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
  if (phone.length === 0) return Promise.reject(new Error("手机号不能为空！"));
  if (!reg.test(phone)) return Promise.reject(new Error("手机号不正确！"));
  return Promise.resolve();
};
export const validateCode = (_, code) => {
  code = code.trim();
  let reg = /^\d{6}$/;
  if (code.length === 0) return Promise.reject(new Error("验证码不能为空！"));
  if (!reg.test(code)) return Promise.reject(new Error("验证码不正确！"));
  return Promise.resolve();
};
