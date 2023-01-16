import { useState } from "react";
import { StatType, StatTypes } from "./App";

interface StatSelectorProps {
    onChange: (value: number, type: StatType) => void;
}

function StatSelector({ onChange }: StatSelectorProps) {
    const [value, setValue] = useState<number>(0);
    const [type, setType] = useState<StatType>(null);

    return <div className="input-group mb-3">
        <input type="text" className="form-control" id="ring1PrimaryValue" placeholder="Primary" onChange={(e) => { onChange(parseFloat(e.target.value) / 100, type); setValue(parseFloat(e.target.value) / 100); }} />
        <span className="input-group-text" id="basic-addon1">%</span>
        <select className="form-select" id="inputGroupSelect02" defaultValue={"null"} onChange={(e) => { onChange(value, e.target.value as StatType); setType(e.target.value as StatType); }}>
            <option value="null" disabled>Type</option>
            {StatTypes.map(type => { return <option value={type.id} key={type.id}>{type.name}</option> })}
        </select>
    </div>;
}

export default StatSelector;