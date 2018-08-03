export const canCreateEvent = (user) => {
  return user.groups.officer
}

