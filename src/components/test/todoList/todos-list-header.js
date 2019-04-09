import React from 'react';

export default class TodosListHeader extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>任务</th>
                    <th>操作</th>
                </tr>
            </thead>
        );
    }
}
