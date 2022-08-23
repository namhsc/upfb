const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
			required: [true, 'Thiếu tên'],
			trim: true,
			text: true,
		},
		last_name: {
			type: String,
			required: [true, 'Thiếu Họ & tên đệm'],
			trim: true,
			text: true,
		},
		username: {
			type: String,
			required: [true, 'Thiếu tên người dùng'],
			trim: true,
			text: true,
			unique: true,
		},

		email: {
			type: String,
			required: [true, 'Thiếu email'],
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Thiếu mật khẩu'],
		},
		picture: {
			type: String,
			trim: true,
			default: 'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
		},
		cover: {
			type: String,
			trim: true,
		},
		gender: {
			type: String,
			required: [true, 'Thiếu giới tính'],
			trim: true,
		},
		bYear: {
			type: Number,
			required: true,
			trim: true,
		},
		bMonth: {
			type: Number,
			required: true,
			trim: true,
		},
		bDay: {
			type: Number,
			required: true,
			trim: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		friends: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
		following: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
		followers: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
		requests: [
			{
				type: ObjectId,
				ref: 'User',
			},
		],
		search: [
			{
				user: {
					type: ObjectId,
					ref: 'User',
					required: true,
				},
				createdAt: {
					type: Date,
					required: true,
				},
			},
		],
		details: {
			bio: {
				type: String,
			},
			otherName: {
				type: String,
			},
			job: {
				type: String,
			},
			workplace: {
				type: String,
			},
			highSchool: {
				type: String,
			},
			college: {
				type: String,
			},
			currentCity: {
				type: String,
			},
			hometown: {
				type: String,
			},
			relationship: {
				type: String,
				enum: ['Độc thân', 'Đang hẹn hò', 'Đã kết hôn', 'Đã ly hôn', 'Quan hệ phức tạp'],
			},
			zalo: {
				type: String,
			},
		},
		savedPosts: [
			{
				post: {
					type: ObjectId,
					ref: 'Post',
				},
				savedAt: {
					type: Date,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('User', userSchema);
