export interface MediaPlayer {
    group_members: string[];
    volume_level: number;
    is_volume_muted: boolean;
    media_content_id: string;
    media_content_type: string;
    media_duration: number;
    media_position: number;
    media_position_updated_at: string;
    media_title: string;
    media_artist: string;
    media_album_name: string;
    media_channel: string;
    shuffle: boolean;
    repeat: string;
    queue_position: number;
    queue_size: number;
    device_class: string;
    entity_picture: string;
    friendly_name: string;
}
