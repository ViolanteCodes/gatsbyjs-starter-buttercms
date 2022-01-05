import React from 'react';

export default function AuthorCard({ author }) {
    const authorAvatar = author.profile_image ? author.profile_image : '/images/team/team-1.png'
    return (
        <a>
            <div className="author-avatar"><img src={authorAvatar}
                layout='fill'
                objectFit='cover'
                alt={`Profile image ${author.first_name} ${author.last_name}`}
                className="blog-page-profile-img"
            /></div>

            {author.first_name} {author.last_name}
        </a>
    )
}