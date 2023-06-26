import * as React from 'react';
import { Accordion } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { AdditionalContent, Content } from 'components';

export const SectionFaq = ({ data }: { data: any }) => {
  const firstId =
    data.faq && data.faq.length > 0 ? data.faq[0]['id'].toString() : '1';

  return (
    <div
      className={`section-faq ${
        data?.content?.title
          ? String(data.content.title).toLowerCase().replace(/\W/g, '')
          : ''
      }`}
    >
      {data.content && <Content content={data.content} />}
      {data.faq && data.faq.length > 0 && (
        <Accordion defaultActiveKey={firstId} className='shadow-sm'>
          {data.faq.map((question: any) => (
            <Accordion.Item
              eventKey={question.id.toString()}
              key={`qna-${question.id.toString()}`}
            >
              <Accordion.Header>{question.question}</Accordion.Header>
              <Accordion.Body>
                <ReactMarkdown linkTarget='_blank'>
                  {question.answer.replaceAll('\\n', '\n')}
                </ReactMarkdown>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
      {data.content && <AdditionalContent content={data.content} />}
    </div>
  );
};
