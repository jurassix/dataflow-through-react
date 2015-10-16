import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

export const TodoCount = (props) => {
  const { activeCount } = props;
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <span className="todo-count">
      <strong>{activeCount || 'No'}</strong> {itemWord} left
    </span>
  );
}

export const FilterLink = (props) => {
  const { filter, selectedFilter, onShow } = props;
  const title = FILTER_TITLES[filter];

  return (
    <a className={classnames({ selected: filter === selectedFilter })}
       style={{ cursor: 'pointer' }}
       onClick={() => onShow(filter)}
       >
      {title}
    </a>
  );
}

export const ClearButton = (props) => {
  const { completedCount, onClearCompleted } = props;
  if (completedCount > 0) {
    return (
      <button className="clear-completed"
              onClick={onClearCompleted}
              >
        Clear completed
      </button>
    );
  }
}

const Footer = (props) => {
  const { activeCount, filter: selectedFilter, onShow, completedCount, onClearCompleted} = props;
  return (
    <footer className="footer">
      <TodoCount activeCount={activeCount} />
      <ul className="filters">
        {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
          <li key={filter}>
            <FilterLink filter={filter}
                        selectedFilter={selectedFilter}
                        onShow={onShow}
                        />
          </li>
        )}
      </ul>
      {<ClearButton completedCount={completedCount}
                     onClearCompleted={onClearCompleted}
                     />}
    </footer>
  );
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default Footer;
