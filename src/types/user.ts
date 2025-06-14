export interface User {
  id: string
  name: string
  email: string
  roleEntity: Role
}

export interface Role {
  id: string
  name: string
  description?: string
}