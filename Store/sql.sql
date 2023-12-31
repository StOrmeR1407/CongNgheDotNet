USE [Money]
GO
/****** Object:  Table [dbo].[Category_Expense]    Script Date: 09-Nov-23 10:48:05 PM ******/
-- Trước khi execute thì hãy tạo database Money trước

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category_Expense](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[description] [nvarchar](100) NULL,
 CONSTRAINT [PK_Category_Expense] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category_Income]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category_Income](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[description] [nvarchar](100) NULL,
 CONSTRAINT [PK_Category_Income] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cookie]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cookie](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NULL,
	[cookie] [varchar](100) NULL,
 CONSTRAINT [PK_Cookie] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Expense]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Expense](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NOT NULL,
	[name] [nvarchar](100) NULL,
	[id_category] [int] NULL,
	[money] [money] NULL,
	[time] [datetime] NULL,
 CONSTRAINT [PK_Expense] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Income]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Income](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NOT NULL,
	[name] [nvarchar](100) NULL,
	[id_category] [int] NULL,
	[money] [money] NULL,
	[time] [datetime] NULL,
 CONSTRAINT [PK_Income] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log](
	[id] [int] NOT NULL,
	[id_user] [int] NULL,
	[time] [datetime] NULL,
	[ip] [varchar](19) NULL,
	[country] [varchar](100) NULL,
 CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Target]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Target](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NULL,
	[name] [nvarchar](100) NULL,
	[money] [money] NULL,
	[time] [datetime] NULL,
 CONSTRAINT [PK_Target] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[username] [varchar](100) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[balance] [money] NULL,
	[delete] [bit] NULL,
	[2FA] [varchar](6) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cookie]  WITH CHECK ADD  CONSTRAINT [FK_Cookie_User] FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Cookie] CHECK CONSTRAINT [FK_Cookie_User]
GO
ALTER TABLE [dbo].[Expense]  WITH CHECK ADD  CONSTRAINT [FK_Expense_Category_Expense] FOREIGN KEY([id_category])
REFERENCES [dbo].[Category_Expense] ([id])
GO
ALTER TABLE [dbo].[Expense] CHECK CONSTRAINT [FK_Expense_Category_Expense]
GO
ALTER TABLE [dbo].[Expense]  WITH CHECK ADD  CONSTRAINT [FK_Expense_User] FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Expense] CHECK CONSTRAINT [FK_Expense_User]
GO
ALTER TABLE [dbo].[Income]  WITH CHECK ADD  CONSTRAINT [FK_Income_Category_Income] FOREIGN KEY([id_category])
REFERENCES [dbo].[Category_Income] ([id])
GO
ALTER TABLE [dbo].[Income] CHECK CONSTRAINT [FK_Income_Category_Income]
GO
ALTER TABLE [dbo].[Income]  WITH CHECK ADD  CONSTRAINT [FK_Income_User] FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Income] CHECK CONSTRAINT [FK_Income_User]
GO
ALTER TABLE [dbo].[Log]  WITH CHECK ADD  CONSTRAINT [FK_Log_User] FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Log] CHECK CONSTRAINT [FK_Log_User]
GO
ALTER TABLE [dbo].[Target]  WITH CHECK ADD  CONSTRAINT [FK_Target_User] FOREIGN KEY([id_user])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Target] CHECK CONSTRAINT [FK_Target_User]
GO
/****** Object:  StoredProcedure [dbo].[SP_Money]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_Money] 
	@action varchar(50),
	@id int = null,
	@id_user int = null,
	@name nvarchar(100) = null,
	@id_category int = null,
	@money money = null,
	@time datetime = null
as
	begin
		declare @json nvarchar(max) = '';

		-- Đây là income 
		if(@action = 'add_income')
			begin
				if(@money is null or @money = '')
					begin
						select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Cần phải thêm số tiền nhận."}')
						select @json as json
						return;
					end

				insert into Income (id_user, [name], id_category, [money], [time])
				values (@id_user, @name, @id_category, @money, @time)

				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Thêm thành công"}')
				select @json as json
			end

		else if(@action = 'modify_income')
			begin
				if(@money is null or @money = '')
					begin
						select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Cần phải thêm số tiền nhận"}')
						select @json as json
						return;
					end
				update Income set [name] = @name, [id_category] = @id_category, [money] = @money, [time] = @time
				where id = @id;

				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Cập nhật thành công"}')
				select @json as json
			end

		else if(@action = 'delete_income')
			begin
				delete from Income where id = @id
				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Xoá thành công"}')
				select @json as json
			end

		else if(@action = 'list_income')
			begin
				select @json+=FORMATMESSAGE(N'{"id": %d, "name": "%s", "category": "%s","money":%s,"time":"%s"},',
				Income.[id], Income.[name], Category_Income.[name] ,str([money]), convert(varchar, [time], 101))
				from [Income] join Category_Income on Income.id_category = Category_Income.id
				where Income.[id_user] = @id_user

				if((@json is null)or(@json=''))
					select N'{"ok":false,"msg":"không có dữ liệu","datas":[]}' as json;
				else
					begin
						select @json=REPLACE(@json,'(null)','null')
						select N'{"ok":true,"msg":"ok","datas":['+left(@json,len(@json)-1)+']}' as json;
					end
			end

		else if(@action = 'add_expense')
			begin
				if(@money is null or @money = '')
					begin
						select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Cần phải thêm số tiền chi."}')
						select @json as json
						return;
					end

				insert into Expense (id_user, [name], id_category, [money], [time])
				values (@id_user, @name, @id_category, @money, @time)

				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Thêm thành công"}')
				select @json as json
			end

		else if(@action = 'modify_expense')
			begin
				if(@money is null or @money = '')
					begin
						select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Cần phải thêm số tiền chi"}')
						select @json as json
					end
				update Expense set [name] = @name, [id_category] = @id_category, [money] = @money, [time] = @time
				where id = @id;

				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Cập nhật thành công"}')
				select @json as json
			end

		else if(@action = 'delete_expense')
			begin
				delete from Expense where id = @id
				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Xoá thành công"}')
				select @json as json
			end

		else if(@action = 'list_expense')
			begin
				select @json+=FORMATMESSAGE(N'{"id": %d, "name": "%s", "category": "%s","money":%s,"time":%s},',
				Income.[id], Income.[name], Category_Expense.[name] ,str([money]), convert(varchar, [time], 101))
				from [Income] join Category_Expense on Income.id_category = Category_Expense.id
				where Income.[id_user] = @id_user

				if((@json is null)or(@json=''))
					select N'{"ok":0,"msg":"không có dữ liệu","datas":[]}' as json;
				else
					begin
						select @json=REPLACE(@json,'(null)','null')
						select N'{"ok":1,"msg":"ok","datas":['+left(@json,len(@json)-1)+']}' as json;
					end
			end

		else if(@action = 'add_target')
			begin
				if(@money is null or @money = '')
					begin
						select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Cần phải thêm số tiền mục tiêu"}')
						select @json as json
						return;
					end

				insert into [Target](id_user, [name], [money], [time])
				values (@id_user, @name, @money, @time)

				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Thêm thành công"}')
				select @json as json
			end

		else if(@action = 'modify_target')
			begin
				if(@money is null or @money = '')
					begin
						select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Cần phải thêm số tiền mục tiêu"}')
						select @json as json
						return;
					end
				update [Target] set [name] = @name, [money] = @money, [time] = @time
				where id = @id;

				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Cập nhật thành công"}')
				select @json as json
			end

		else if(@action = 'delete_target')
			begin
				delete from [Target] where id = @id
				select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Xoá thành công"}')
				select @json as json
			end	
			
		else if(@action = 'list_target')
			begin
				select @json+=FORMATMESSAGE(N'{"id": %d, "name": "%s","money":%s,"time":%s},',
				Income.[id], Income.[name], str([money]), convert(varchar, [time], 101))
				from [Income] join Category_Expense on Income.id_category = Category_Expense.id
				where Income.[id_user] = @id_user

				if((@json is null)or(@json=''))
					select N'{"ok":0,"msg":"không có dữ liệu","datas":[]}' as json;
				else
					begin
						select @json=REPLACE(@json,'(null)','null')
						select N'{"ok":1,"msg":"ok","datas":['+left(@json,len(@json)-1)+']}' as json;
					end
			end
	end

	


GO
/****** Object:  StoredProcedure [dbo].[SP_User]    Script Date: 09-Nov-23 10:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--procedure for user

CREATE proc [dbo].[SP_User]
	@action varchar(50),
	@id int = null,
	@name nvarchar(100) = null,
	@username varchar(100) = null,
	@password varchar(100) = null,
	@email varchar(100) = null,
	@balance varchar(100) = null,
	@2FA varchar(6) = null
	as
		begin
			declare @json nvarchar(max) = null
			if(@action = 'login')
				begin
					if(exists(select * from [User] where username = @username and [password] = @password and [delete] is null))
						begin
							select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "done", "id": %d, "name": "%s"}',[id],[name])
							from [User] where username = @username and [password] = @password and [delete] is null;	
							select @json as json
						end
					else
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Tên tài khoản hoặc mật khẩu không đúng"}')
							select @json as json
						end
										
				end
			else if(@action = 'signup')
				begin
					if(exists(select * from [User] where username = @username))
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "username này đã tồn tại"}')
							select @json as json
						end
					else if(exists(select * from [User] where email = @email) and @email is not null)
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "email này đã tồn tại"}')
							select @json as json
						end						
					else
						begin
							insert into [User]([name],[username],[password],email,balance)
							values (@name,@username,@password,@email,'0')

							select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Đã tạo tài khoản thành công"}')
							select @json as json

							set @id = (select id from [User] where username = @username and id is not null)
							insert into Cookie (id_user,cookie)
							values (@id, NEWID())
						end
				end
			else if(@action = 'modify')
				begin
					if(exists(select * from [User] where username = @username))
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "username này đã tồn tại"}')
							select @json as json
						end
					else if(exists(select * from [User] where email = @email) and @email is not null)
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "email này đã tồn tại"}')
							select @json as json
						end
					else
						begin
							update [User] set email = @email, [name] = @name where id = @id
							
							select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Sửa đổi thành công"}')
							select @json as json
						end
				end
			else if(@action = 'delete')
				begin
					update [User] set [delete] = 0 where id = @id;

					delete from [Cookie] where id = @id;
					select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Bạn đã xoá thành công"}')
					select @json as json
				end

			else if(@action = 'checkmail')
				begin
					if(exists(select * from [User] where email = @email and (email is not null or email = '')))
						begin
							Update [User] set [2FA] = @2FA where email = @email
							select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Success"}')
							select @json as json
						end
					else
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Failure"}')
							select @json as json
						end
				end
			else if(@action = 'check2FA')
				begin
					if(exists(select * from [User] where email = @email and (email is not null or email = '') and [2FA] = @2FA))
						begin
							select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Success"}')
							select @json as json
						end
					else
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Failure"}')
							select @json as json
						end
				end
			else if(@action = 'changepw')
				begin
					if(len(@password) < 8)
						begin
							select @json = FORMATMESSAGE(N'{"ok": false, "msg" : "Password phải trên 8 kí tự"}')
							select @json as json
							return;
						end
					else
						begin
							Update [User] set [password] = @password where email = @email
							select @json = FORMATMESSAGE(N'{"ok": true, "msg" : "Đổi mật khẩu thành công"}')
							select @json as json
						end
				end
		end

GO

-- Đoạn dưới này sẽ thực thi từng trigger một, bôi đen từng đoạn trigger để tạo
/*
Create TRIGGER [dbo].[Trg_delete-Income] ON [dbo].[Income] FOR Delete AS
		BEGIN
			SET NOCOUNT ON;
			Update [User]
			Set balance = balance -
			(select [money] from deleted where [id_user] = [User].id)
			from [User] join deleted on [User].[id] = deleted.id_user
		END

Create TRIGGER [dbo].[Trg_insert-Income] ON [dbo].[Income] After INSERT AS
		BEGIN
			SET NOCOUNT ON;
			Update [User]
			Set balance = balance +
			(select [money] from inserted where [id_user] = [User].id)
			from [User] join inserted on [User].[id] = inserted.id_user
		END

Create TRIGGER [dbo].[Trg_update-Income] ON [dbo].[Income] for update AS
		BEGIN
			SET NOCOUNT ON;		
			Update [User]
			Set balance = balance +
			(select [money] from inserted where [id_user] = [User].id) -
			(select [money] from deleted where [id_user] = [User].id)
			from [User]
			join deleted on [User].id = deleted.id_user
		END

Create TRIGGER [dbo].[Trg_delete-Expense] ON [dbo].[Expense] for Delete AS
		BEGIN
			SET NOCOUNT ON;
			Update [User]
			Set balance = balance +
			(select [money] from deleted where [id_user] = [User].id)
			from [User] join deleted on [User].[id] = deleted.id_user
		END

Create TRIGGER [dbo].[Trg_insert-Expense] ON [dbo].[Expense] After INSERT AS
		BEGIN
			SET NOCOUNT ON;
			Update [User]
			Set balance = balance -
			(select [money] from inserted where [id_user] = [User].id)
			from [User] join inserted on [User].[id] = inserted.id_user
		END

Create TRIGGER [dbo].[Trg_update-Expense] ON [dbo].[Expense] for update AS
		BEGIN
			SET NOCOUNT ON;
			Update [User]
			Set balance = balance -
			(select [money] from inserted where [id_user] = [User].id) +
			(select [money] from deleted where [id_user] = [User].id)
			from [User] join deleted on [User].[id] = deleted.id_user
		END
*/