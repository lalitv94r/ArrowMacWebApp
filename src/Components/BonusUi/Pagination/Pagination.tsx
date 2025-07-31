"use client";
import { PaginationComponentPropTypes } from '@/Type/PaginationComponentTypes';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const PaginationComponent = ({
  activePage = 1,
  pages,
  onActivePageChange
}: PaginationComponentPropTypes) => {

  const getSegmentsLength = (count: number, segmentSize: number = 10) => {
    let segments: Array<any> = [];
    let segment: Array<any> = [];

    for (let i = 1; i <= count; i++) {
      segment.push(i);
      if (segment.length === segmentSize || i === count) {
        segments.push(segment);
        segment = [];
      }
    }
    return segments.length;
  }

  return (
    <>
      <div className='d-flex justify-content-md-end'>
        <Pagination className="pagination-primary pagination-border-primary">
          <PaginationItem>
            <PaginationLink onClick={() => (activePage - 1) >= 1 && onActivePageChange(activePage - 1)} first></PaginationLink>
          </PaginationItem>
          {
            Array.from({ length: getSegmentsLength(pages, 10) }, (_, i) => (
              <PaginationItem active={activePage === i + 1} key={i}>
                <PaginationLink onClick={() => onActivePageChange?.(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          }
          <PaginationItem>
            <PaginationLink onClick={() => (activePage + 1) <= getSegmentsLength(pages, 10) && onActivePageChange(activePage + 1)} last></PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </>
  )
}

export default PaginationComponent;