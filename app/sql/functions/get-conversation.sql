CREATE OR REPLACE FUNCTION get_conversation(from_user_id uuid, to_user_id uuid)
RETURNS TABLE (message_room_id bigint) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT m1.message_room_id
    FROM message_room_members m1
    INNER JOIN message_room_members m2
    ON m1.message_room_id = m2.message_room_id
    WHERE m1.profile_id = from_user_id
    AND m2.profile_id = to_user_id;
END;
$$;