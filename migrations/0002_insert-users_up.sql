DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM users) THEN
      INSERT INTO users (username, password, email, role)
      VALUES 
        ('admin', '$argon2id$v=19$m=19456,t=2,p=1$gAxoCqrlM1uQPwjKHSgvXg$xggG9Lb4QxVE96eQ70egNJ3TEMZPBU/obPIZRYZnK48', 'admin@gmail.com', 'admin'), 
        ('user1', '$argon2id$v=19$m=19456,t=2,p=1$yq7xlPTQfDoOXoIXa3cS2Q$8+/bwyWtFtJ/wA6CHNXV5VgxMLrQwXEVHbK1kdtx/YE', 'user1@gmail.com', 'user'), 
        ('user2', '$argon2id$v=19$m=19456,t=2,p=1$u1A0MgTC8wB+JkNQJAbmPg$eqshS0CQlElLfI4UxIXb3tue1dfymH1s2uC3HaN0ls8', 'user2@gmail.com', 'user');
   END IF;
END $$;