
export interface IUserProfile {
    country: string,
    display_name: string,
    explicit_content: { filter_enabled: boolean, filter_locked: boolean },
    external_urls: unknown,
    followers: unknown,
    href: string,
    id: string,
    images: [],
    product: string,
    type: string,
    uri: string
}

export interface IUserActivePlayback {
    "timestamp": number,
    "device": {
        "id": string,
        "is_active": boolean,
        "is_restricted": boolean,
        "name": string,
        "type": string,
        "volume_percent": number
    },
    "progress_ms": string,
    "is_playing": boolean,
    "currently_playing_type": 'track' | 'ad' | 'episode' | 'unknown',
    "actions": {
        "disallows": {
        "resuming": boolean
        }
    },
    "item": {
        album: {
          album_type: string,
          artists: [],
          available_markets: [],
          external_urls: [],
          href: string,
          id: string,
          images: [],
          name: string,
          release_date: string,
          release_date_precision: string,
          total_tracks: number,
          type: string,
          uri: string
        },
        artists: Array<
            {
              external_urls: {},
              href: string,
              id: string,
              name: string,
              type: 'artist',
              uri: string
            }
        >,
        available_markets: [],
        disc_number: number,
        duration_ms: number,
        explicit: boolean,
        external_ids: { },
        external_urls: {},
        href: string,
        id: string,
        is_local: boolean,
        is_playable: boolean,
        name: string,
        popularity: number,
        preview_url: string,
        track_number: number,
        type: string,
        uri: string
      },
    "shuffle_state": boolean,
    "repeat_state": 'off' | 'on',
    "context": {
        "external_urls" : {},
        "href" : string,
        "type" : 'playlist' | unknown,
        "uri" : string
    }
}
