import { AudioChat, Chat, DeleteFeed, DemoteFeed, EmoticonChat, FeedChat, FileChat, HandOverFeed, InviteFeed, KickedFeed, LeaveFeed, MapChat, MemberTypeChangedFeed, MultiPhotoChat, NormalChat, OldEmoticonChat, OpenChatJoinedFeed, OpenChatKickedFeed, PhotoChat, ProfileChat, PromoteFeed, ReplyChat, VideoChat } from '../db-manager/classes';

export abstract class ChatType<C extends Chat> {
    abstract is(chat: Chat): chat is C;
}

export class AudioChatType extends ChatType<AudioChat> {
    is(chat: Chat): chat is AudioChat {
        return chat instanceof AudioChat;
    }
}

const audioChatType = new AudioChatType();

export class EmoticonChatType extends ChatType<EmoticonChat> {
    is(chat: Chat): chat is EmoticonChat {
        return chat instanceof EmoticonChat;
    }
}

const emoticonChatType = new EmoticonChatType();

export class FeedChatType extends ChatType<FeedChat> {
    is(chat: Chat): chat is FeedChat {
        return chat instanceof FeedChat;
    }
}

const feedChatType = new FeedChatType();

export class InviteFeedChatType extends ChatType<InviteFeed> {
    is(chat: Chat): chat is InviteFeed {
        return chat instanceof InviteFeed;
    }
}

const inviteFeedChatType = new InviteFeedChatType();

export class OpenChatJoinedFeedChatType extends ChatType<OpenChatJoinedFeed> {
    is(chat: Chat): chat is OpenChatJoinedFeed {
        return chat instanceof OpenChatJoinedFeed;
    }
}

const openChatJoinedFeedChatType = new OpenChatJoinedFeedChatType();

export class KickedFeedChatType extends ChatType<KickedFeed> {
    is(chat: Chat): chat is KickedFeed {
        return chat instanceof KickedFeed;
    }
}

const kickedFeedChatType = new KickedFeedChatType();

export class LeaveFeedChatType extends ChatType<LeaveFeed> {
    is(chat: Chat): chat is LeaveFeed {
        return chat instanceof LeaveFeed;
    }
}

const leaveFeedChatType = new LeaveFeedChatType();

export class OpenChatKickedFeedChatType extends ChatType<OpenChatKickedFeed> {
    is(chat: Chat): chat is OpenChatKickedFeed {
        return chat instanceof OpenChatKickedFeed;
    }
}

const openChatKickedFeedChatType = new OpenChatKickedFeedChatType();

export class MemberTypeChangedFeedChatType extends ChatType<MemberTypeChangedFeed> {
    is(chat: Chat): chat is MemberTypeChangedFeed {
        return chat instanceof MemberTypeChangedFeed;
    }
}

const memberTypeChangedFeedChatType = new MemberTypeChangedFeedChatType();

export class PromoteFeedChatType extends ChatType<PromoteFeed> {
    is(chat: Chat): chat is PromoteFeed {
        return chat instanceof PromoteFeed;
    }
}

const promoteFeedChatType = new PromoteFeedChatType();

export class DemoteFeedChatType extends ChatType<DemoteFeed> {
    is(chat: Chat): chat is DemoteFeed {
        return chat instanceof DemoteFeed;
    }
}

const demoteFeedChatType = new DemoteFeedChatType();

export class HandOverFeedChatType extends ChatType<HandOverFeed> {
    is(chat: Chat): chat is HandOverFeed {
        return chat instanceof HandOverFeed;
    }
}

const handOverFeedChatType = new HandOverFeedChatType();

export class DeleteFeedChatType extends ChatType<DeleteFeed> {
    is(chat: Chat): chat is DeleteFeed {
        return chat instanceof DeleteFeed;
    }
}

const deleteFeedChatType = new DeleteFeedChatType();

export class FileChatType extends ChatType<FileChat> {
    is(chat: Chat): chat is FileChat {
        return chat instanceof FileChat;
    }
}

const fileChatType = new FileChatType();

export class MapChatType extends ChatType<MapChat> {
    is(chat: Chat): chat is MapChat {
        return chat instanceof MapChat;
    }
}

const mapChatType = new MapChatType();

export class MultiPhotoChatType extends ChatType<MultiPhotoChat> {
    is(chat: Chat): chat is MultiPhotoChat {
        return chat instanceof MultiPhotoChat;
    }
}

const multiPhotoChatType = new MultiPhotoChatType();

export class NormalChatType extends ChatType<NormalChat> {
    is(chat: Chat): chat is NormalChat {
        return chat instanceof NormalChat;
    }
}

const normalChatType = new NormalChatType();

export class OldEmoticonChatType extends ChatType<OldEmoticonChat> {
    is(chat: Chat): chat is OldEmoticonChat {
        return chat instanceof OldEmoticonChat;
    }
}

const oldEmoticonChatType = new OldEmoticonChatType();

export class PhotoChatType extends ChatType<PhotoChat> {
    is(chat: Chat): chat is PhotoChat {
        return chat instanceof PhotoChat;
    }
}

const photoChatType = new PhotoChatType();

export class ProfileChatType extends ChatType<ProfileChat> {
    is(chat: Chat): chat is ProfileChat {
        return chat instanceof ProfileChat;
    }
}

const profileChatType = new ProfileChatType();

export class ReplyChatType extends ChatType<ReplyChat> {
    is(chat: Chat): chat is ReplyChat {
        return chat instanceof ReplyChat;
    }
}

const replyChatType = new ReplyChatType();

export class VideoChatType extends ChatType<VideoChat> {
    is(chat: Chat): chat is VideoChat {
        return chat instanceof VideoChat;
    }
}

const videoChatType = new VideoChatType();

export {
    audioChatType as audioChat,
    emoticonChatType as emoticonChat,
    feedChatType as feedChat,
    inviteFeedChatType as inviteFeedChat,
    openChatJoinedFeedChatType as openChatJoinedFeed,
    kickedFeedChatType as kickedFeed,
    leaveFeedChatType as leaveFeed,
    openChatKickedFeedChatType as openChatKickedFeed,
    memberTypeChangedFeedChatType as memberTypeChangedFeed,
    promoteFeedChatType as promoteFeed,
    demoteFeedChatType as demoteFeed,
    handOverFeedChatType as handOverFeed,
    deleteFeedChatType as deleteFeed,
    fileChatType as fileChat,
    mapChatType as mapChat,
    multiPhotoChatType as multiPhotoChat,
    normalChatType as normalChat,
    oldEmoticonChatType as oldEmoticonChat,
    photoChatType as photoChat,
    profileChatType as profileChat,
    replyChatType as replyChat,
    videoChatType as videoChat
}