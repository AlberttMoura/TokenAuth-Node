import { Pool } from 'pg'

const connectionString =
	'postgres://pwefhepl:kH6hAjWoZaqJA2OSxMQhRtZxx3Hc7PIL@kesavan.db.elephantsql.com/pwefhepl'

const db = new Pool({ connectionString })

export default db
