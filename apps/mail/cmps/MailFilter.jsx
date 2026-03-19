const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        setFilterByToEdit({ ...filterBy })
    }, [filterBy])

    function handleChange({ target }) {
        const { name, value } = target
        const newFilter = { ...filterByToEdit, [name]: value }
        setFilterByToEdit(newFilter)
        onFilter(newFilter)
    }

    return (
        <section className="mail-filter">
            <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    name="txt"
                    placeholder="Search mail"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
            </div>
            <select 
                name="isRead" 
                value={filterByToEdit.isRead} 
                onChange={handleChange}
            >
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </section>
    )
}
