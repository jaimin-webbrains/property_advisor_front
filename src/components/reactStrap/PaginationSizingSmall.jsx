import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Example = () => {
    return (
        <Pagination size="sm" aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
        </Pagination>
    );
};
export default Example;
