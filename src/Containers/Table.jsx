import React from "react";
import { sortBy } from "lodash";
import classNames from "classnames";

import Button from "../UIElements/Button";


// SORTING GOES HERE
const SORTS = {
    NONE: list => list,
    TITLE: list => list.sortBy(list, "title"),
    AUTHOR: list => list.sortBy(list, "author"),
    COMMENTS: list => list.sortBy(list, "num_comments").reverse(),
    POINTS: list => list.sortBy(list, "points").reverse()
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: "NONE",
            isSortReverse: false,
        }
        this.onSort = this.onSort.bind(this)
    }
    onSort(sortKey) {
        const isSortReverse = sortKey === this.state.sortKey && !this.state.isSortReverse;
        this.setState({ sortKey: isSortReverse })
    }

    render() {
        const { list, onDismiss } = this.props;
        const { sortKey, isSortReverse } = this.state;
        const sortedList = SORTS[sortKey](list);
        const reverseList = isSortReverse ? sortedList.reverse() : sortedList
        return (
            <div className="table">
                <div className="table-header">
                    <span style={{ width: "40%" }}>
                        <Sort activeSortKey={sortKey} onSort={this.onSort} sortKey={"TITLE"} >
                            Title
                        </Sort>
                    </span>
                    <span style={{ width: "30%" }}>
                        <Sort activeSortKey={sortKey} onSort={this.onSort} sortKey={"AUTOR"}>
                            Author
                        </Sort>
                    </span>
                    <span style={{ width: "10%" }}>
                        <Sort activeSortKey={sortKey} onSort={this.onSort} sortKey={"COMMENTS"}>
                            Comments
                        </Sort>
                    </span>
                    <span style={{ width: "10%" }}>
                        <Sort activeSortKey={sortKey} onSort={this.onSort} sortKey={"POINTS"}>
                            Points
                        </Sort>
                    </span>
                    <span style={{ width: "10%" }}>
                        Archive
                    </span>
                </div>
                {reverseList.map(i => {
                    return (
                        <div key={i.objectID} className="table-row">
                            <span style={{ width: "40%" }}>
                                <a href={i.url}>{i.title}</a>
                            </span>
                            <span style={{ width: "30%" }}>{i.author}</span>
                            <span style={{ width: "10%" }}>{i.num_comments}</span>
                            <span style={{ wdith: "10%" }}>{i.points}</span>
                            <span style={{ width: "10%" }}>
                                <Button className="button-inline" onClick={() => onDismiss(i.objectID)}>
                                    Dismiss
                                </Button>
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }
}


const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
    const sortClass = classNames("button-inline", {
        "button-active": sortKey === activeSortKey
    })
    return (
        <Button onClick={() => onSort(sortKey)} className={sortClass}>
            {children}
        </Button>
    )
}

export default Table;