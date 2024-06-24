function validateRegisterForm(username, fullName, email, role, password, confirmPassword) {
  let errors = [];

  if (!username.trim()) {
     errors.push("Username is required.");
  } else if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
     errors.push("Username must be alphanumeric and may contain underscores (_).");
  }
  if (!fullName.trim()) {
     errors.push("Full Name is required.");
  } else if (fullName.length > 100) {
     errors.push("Full Name cannot exceed 100 characters.");
  }
  if (!email.trim()) {
     errors.push("Email is required.\n");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
     errors.push("Invalid email format.\n");
  }

  if (!role.trim()) {
     errors.push("Role is required.\n");
  } else if (role !== "client" && role !== "vendor") {
     errors.push("Invalid role. Allowed roles are 'client' or 'vendor'.\n");
  }

  if (!password) {
    errors.push("Password is required.\n");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.\n");
  } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
     errors.push("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).\n");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.\n");
  }

  return errors;
}

function validateLoginForm(username, password) {
  let errors = [];

  if (!username.trim()) {
     errors.push("Username is required.\n");
  } else if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
     errors.push("Username must be alphanumeric and may contain underscores (_).\n");
  } if (!password) {
     errors.push("Password is required.\n");
  } else if (password.length < 8) {
     errors.push("Password must be at least 8 characters long.\n");
  } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
     errors.push("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).\n");
  }
  return errors;
}

