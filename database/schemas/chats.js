import mongoose from 'mongoose'

const ChatSchema = mongoose.Schema(
	{
		user: {
			id: {
				type: String,
				default: ''
			}
		},
		messages: [
			{
				role: String,
				message: String,
				created: String
			}
		],
		status: {
			type: Boolean,
			default: false
		},
		created: {
			type: String,
			default: ''
		},
		updated: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
)

const Chats = mongoose.models.Chats || mongoose.model('Chats', ChatSchema)

export default Chats
