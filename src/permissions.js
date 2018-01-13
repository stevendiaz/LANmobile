export const canCreateEvent = (user) => {
  return isOfficer(user)
}

export const isOfficer = (user) => {
  if (!user) return false
  //return user.is_active && user.is_staff && user.is_verified
  return user.is_active && true && user.is_verified
}

