import React from 'react'
import { useTable } from 'react-table'
//import { updateCols } from '../endpoints'

function Table(props) {
    const sel = props.selection
    const vals = Array.from(props.data)
    const cols = Array.from(props.column)
    console.log(cols)
    
    
    const data = React.useMemo(() => vals, [vals])
    const columns = React.useMemo(() => cols, [sel])
    /*
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'poi_id', // accessor is the "key" in the data
            },
            {
                Header: 'Column 2',
                accessor: 'name',
            },
        ],
        []
    )
    */
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )   
}

export default Table 