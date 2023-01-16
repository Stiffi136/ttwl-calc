import { useState } from 'react';
import { Condition, conditions, StatType, statTypes } from './App';

interface StatSelectorProps {
  onChange: (value: number, type: StatType, condition: Condition) => void;
}

function StatSelector({ onChange }: StatSelectorProps) {
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<StatType>(null);
  const [condition, setCondition] = useState<Condition>('Everything');

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        id="ring1PrimaryValue"
        placeholder="Value"
        onChange={e => {
          onChange(parseFloat(e.target.value) / 100, type, condition);
          setValue(parseFloat(e.target.value) / 100);
        }}
      />
      <span className="input-group-text">%</span>
      <select
        className="form-select"
        defaultValue={'null'}
        onChange={e => {
          onChange(value, e.target.value as StatType, condition);
          setType(e.target.value as StatType);
        }}>
        <option value="null" disabled>
          Type
        </option>
        {statTypes.map(type => {
          return typeof type.id === 'string' ? (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ) : (
            <option value={'None'} key={'None'}>
              None
            </option>
          );
        })}
      </select>
      <span className="input-group-text">applies to</span>
      <select
        className="form-select"
        defaultValue={'Passive'}
        onChange={e => {
          onChange(value, type, e.target.value as Condition);
          setCondition(e.target.value as Condition);
        }}>
        {conditions.map(type => {
          return typeof type.id === 'string' ? (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ) : (
            <option value={'Everything'} key={'Everything'}>
              Passive
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default StatSelector;
