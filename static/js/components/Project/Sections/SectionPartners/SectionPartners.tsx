import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import { AdditionalContent, Content, Image } from 'components';

export const SectionPartners = ({ data }: { data: any }) => {
  return (
    <div
      className={`section-partners ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, '')
          : ''
      }`}
    >
      {data.content && <Content content={data.content} />}
      {data.partners && (
        <div className='row mb-1'>
          {data.partners.map((partner: any) => (
            <div
              className={`${
                partner.columnSize ? partner.columnSize : 'col-xl-4'
              } mb-4`}
              key={partner.title}
            >
              <div className='partner card  d-flex flex-column justify-content-between text-center h-100'>
                <div className='card-body'>
                  {partner.image && (
                    <div className='partner-logo-holder mt-2 mb-spacer d-flex align-items-center justify-content-center'>
                      <Image
                        data={partner.image}
                        className={`partner-logo ${
                          partner.title
                            ? String(partner.title)
                                .toLowerCase()
                                .replace(/\W/g, '')
                            : ''
                        }`}
                      />
                    </div>
                  )}

                  {partner.title && <p className='h3 mb-3'>{partner.title}</p>}
                  {partner.description && (
                    <div className='mb-3 text-secondary'>
                      <ReactMarkdown linkTarget='_blank'>
                        {partner.description.replaceAll('\\n', '\n')}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                {partner.btnText && partner.btnLink && (
                  <div className='card-footer mt-0'>
                    <a
                      target='_blank'
                      className='mb-2'
                      href={partner.btnLink}
                      aria-label={partner.btnText}
                      rel='noreferrer nofollow'
                    >
                      {partner.btnText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {data.content && <AdditionalContent content={data.content} />}
    </div>
  );
};
