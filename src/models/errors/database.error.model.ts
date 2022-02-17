class DatabaseError extends Error {
	constructor(message: string, error: any) {
		super(message)
	}
}

export default DatabaseError
