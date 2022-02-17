import User from '../models/user.model'
import db from '../db'

class UserRepository {
	async findAllUsers(): Promise<User[]> {
		const query = 'SELECT uuid, username FROM app_user'
		const { rows } = await db.query<User>(query)
		return rows || []
	}

	async findUserById(uuid: string): Promise<User> {
		const query = `SELECT uuid, username FROM app_user WHERE uuid = $1`
		const { rows } = await db.query<User>(query, [uuid])
		const [user] = rows
		return user || {}
	}
}

export default new UserRepository()
