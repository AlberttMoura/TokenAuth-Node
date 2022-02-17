import User from '../models/user.model'
import db from '../db'

class UserRepository {
	async findAllUsers(): Promise<User[]> {
		const query = 'SELECT uuid, username FROM app_user'
		const { rows } = await db.query<User>(query)
		return rows || []
	}

	async findUserById(uuid: string): Promise<User> {
		const query = 'SELECT uuid, username FROM app_user WHERE uuid = $1'
		const { rows } = await db.query<User>(query, [uuid])
		const [user] = rows
		return user || {}
	}

	async createUser(user: User): Promise<User> {
		const query =
			'INSERT INTO app_user (username, password) VALUES ($1, crypt($2, $3))'
		const { rows } = await db.query<User>(query, [
			user.username,
			user.password,
			'bread',
		])
		return rows[0] || {}
	}
}

export default new UserRepository()
