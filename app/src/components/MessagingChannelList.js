import React, { useEffect } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { SkeletonLoader } from './SkeletonLoader';
import { CreateChannelIcon } from './CreateChannelIcon';

import "../styles/MessageChannelList.css";

const MessagingChannelList = ({ children, error = false, loading, onCreateChannel }) => {
    const { client, setActiveChannel } = useChatContext();


    useEffect(() => {
        const getDemoChannel = async (client) => {
            const channel = client.channel('team', 'Music');
            await channel.watch();
            //await channel.addMembers([client.user.id]);
            setActiveChannel(channel);
        };

        if (!loading && !children?.props?.children?.length) {
            getDemoChannel(client);
        }
    }, [loading]);

    const ListHeaderWrapper = ({ children }) => {
        return (
            <div className='messaging__channel-list'>
                <div className='messaging__channel-list__header'>
                    {/* //<Avatar image={image} name={name} size={40} />*/}
                    <div className='messaging__channel-list__header__name'>Mellon</div>
                    <button className='messaging__channel-list__header__button' onClick={onCreateChannel}>
                        <CreateChannelIcon />
                    </button>
                </div>
                {children}
            </div>
        );
    };
    if (error) {
        return (
            <ListHeaderWrapper>
                <div className='messaging__channel-list__message'>
                    Error loading conversations, please try again momentarily.
                </div>
            </ListHeaderWrapper>
        );
    }

    if (loading) {
        return (
            <ListHeaderWrapper>
                <div className='messaging__channel-list__message'>
                    <SkeletonLoader />
                </div>
            </ListHeaderWrapper>
        );
    }

    return <ListHeaderWrapper>{children}</ListHeaderWrapper>;
}

export default MessagingChannelList;