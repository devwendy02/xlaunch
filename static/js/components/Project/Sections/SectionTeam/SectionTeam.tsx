import * as React from 'react';
import {
  faTwitter,
  faLinkedin,
  faInstagram,
  faFacebook,
  faYoutube,
  faGithub,
  faMedium
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';

import { AdditionalContent, Content, Image } from 'components';

export const SectionTeam = ({ data }: { data: any }) => {
  return (
    <div
      className={`section-team ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, '')
          : ''
      }`}
    >
      {data.content && <Content content={data.content} />}
      {data.team && (
        <div className='row mb-1'>
          {data.team.map((member: any) => (
            <div
              className={`${
                member.columnSize ? member.columnSize : 'col-xl-4'
              } mb-4`}
              key={member.name}
            >
              <div className='team-member card d-flex flex-column justify-content-between text-center h-100'>
                <div className='card-body pb-2'>
                  {member.image && (
                    <Image
                      data={member.image}
                      className='team-image circle mx-auto mb-3'
                    />
                  )}
                  {member.name && (
                    <p className='h3 mb-3 team-name'>{member.name}</p>
                  )}
                  {member.title && (
                    <div className='mt-n2 team-title mb-3'>
                      <ReactMarkdown linkTarget='_blank'>
                        {member.title.replaceAll('\\n', '\n')}
                      </ReactMarkdown>
                    </div>
                  )}
                  {member.description && (
                    <div className='team-description text-secondary'>
                      <ReactMarkdown linkTarget='_blank'>
                        {member.description.replaceAll('\\n', '\n')}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                <div className='card-footer team-social pt-0'>
                  {member.linkedin && (
                    <a
                      target='_blank'
                      className='mx-2 mb-2 social-icon'
                      href={member.linkedin}
                      aria-label='LinkedIn'
                      rel='noreferrer nofollow'
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      target='_blank'
                      className='mx-2 mb-2 social-icon'
                      href={member.twitter}
                      aria-label='Twitter'
                      rel='noreferrer nofollow'
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      target='_blank'
                      className='mx-2 mb-2 social-icon'
                      href={member.instagram}
                      aria-label='Instagram'
                      rel='noreferrer nofollow'
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  )}
                  {member.facebook && (
                    <a
                      target='_blank'
                      className='mx-2 mb-2 social-icon'
                      href={member.facebook}
                      aria-label='Facebook'
                      rel='noreferrer nofollow'
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      target='_blank'
                      className='mx-2 mb-2 social-icon'
                      href={member.github}
                      aria-label='Github'
                      rel='noreferrer nofollow'
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                  {member.youtube && (
                    <a
                      target='_blank'
                      className='mx-2 mb-2 social-icon'
                      href={member.youtube}
                      aria-label='Youtube'
                      rel='noreferrer nofollow'
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  )}
                  {member.medium && (
                    <a
                      target='_blank'
                      className='mx-2 mb-2 social-icon'
                      href={member.medium}
                      aria-label='Medium'
                      rel='noreferrer nofollow'
                    >
                      <FontAwesomeIcon icon={faMedium} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {data.content && <AdditionalContent content={data.content} />}
    </div>
  );
};
