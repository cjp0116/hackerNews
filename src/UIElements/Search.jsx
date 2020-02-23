import React from "react";

const Search = ({ onChange, onSubmit, searchTerm, children}) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={onChange}
            />
            <button type="submit">
                {children}
            </button>
        </form>
    )
}

export default Search