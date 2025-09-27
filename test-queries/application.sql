select * from user

delete from application where user_id = 'FydELJygdpa9z35LlIFVXIKidhM6hxb8'

INSERT INTO application (
  id, email, membership_no, department_no, birth_date,
  first_name, last_name, first_name_kana, last_name_kana,
  postal_code, municipality, mobile_number, telephone_number,
  state, user_id
) VALUES (
  24, 'khangal1@test.com', 'voert123', 'Bide123', '1946-04-04',
  'Khangal', 'Jargalsaikhan', 'VA123', 'VA23',
  '12319805', 'Wilmington', '3232078554', '1233322233',
  'pending', 'FydELJygdpa9z35LlIFVXIKidhM6hxb8'
);
