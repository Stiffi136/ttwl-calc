import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ItemStats from './ItemStats';

export type StatType =
  | null
  | 'None'
  | 'GunDamage'
  | 'AllDamage'
  | 'ElementalDamage'
  | 'PoisonDamage'
  | 'LightningDamage'
  | 'FireDamage'
  | 'FrostDamage'
  | 'DarkDamage'
  | 'SpellDamage'
  | 'MeleeDamage'
  | 'CritDamage';
export type Condition =
  | 'Everything'
  | 'Pistol'
  | 'Shotgun'
  | 'AssaultRifle'
  | 'Launcher'
  | 'SMG'
  | 'Sniper'
  | 'Melee'
  | 'Spell'
  | 'Ability'
  | 'Companion'
  | 'ActionSkill';
export const conditions: {
  id: Condition;
  name: string;
  category:
    | 'Everything'
    | 'Gun'
    | 'Spell'
    | 'Melee'
    | 'Ability'
    | 'Companion'
    | 'ActionSkill';
}[] = [
  {
    id: 'Everything',
    name: 'Everything',
    category: 'Everything',
  },
  {
    id: 'Pistol',
    name: 'Pistol',
    category: 'Gun',
  },
  {
    id: 'Shotgun',
    name: 'Shotgun',
    category: 'Gun',
  },
  {
    id: 'AssaultRifle',
    name: 'Assault Rifle',
    category: 'Gun',
  },
  {
    id: 'Launcher',
    name: 'Launcher',
    category: 'Gun',
  },
  {
    id: 'SMG',
    name: 'SMG',
    category: 'Gun',
  },
  {
    id: 'Sniper',
    name: 'Sniper Rifle',
    category: 'Gun',
  },
  {
    id: 'Melee',
    name: 'Melee',
    category: 'Melee',
  },
  {
    id: 'Spell',
    name: 'Spell',
    category: 'Spell',
  },
  {
    id: 'Ability',
    name: 'Ability',
    category: 'Ability',
  },
  {
    id: 'Companion',
    name: 'Companion',
    category: 'Companion',
  },
  {
    id: 'ActionSkill',
    name: 'Action Skill',
    category: 'ActionSkill',
  },
];
export type Stat = {
  value: number;
  type: StatType;
  idx: number;
  condition: Condition;
};
export const statTypes: { id: StatType; name: string }[] = [
  {
    id: 'GunDamage',
    name: 'Gun Damage',
  },
  {
    id: 'AllDamage',
    name: 'All Damage',
  },
  {
    id: 'CritDamage',
    name: 'Critical Damage',
  },
  {
    id: 'SpellDamage',
    name: 'Spell Damage',
  },
  {
    id: 'MeleeDamage',
    name: 'Melee Damage',
  },
  {
    id: 'ElementalDamage',
    name: 'Elemental Damage',
  },
  {
    id: 'PoisonDamage',
    name: 'Poison Damage',
  },
  {
    id: 'LightningDamage',
    name: 'Lightning Damage',
  },
  {
    id: 'FireDamage',
    name: 'Fire Damage',
  },
  {
    id: 'FrostDamage',
    name: 'Frost Damage',
  },
  {
    id: 'DarkDamage',
    name: 'Dark Magic Damage',
  },
];

function App() {
  const [ring1, setRing1] = useState<Stat[]>([]);
  const [ward, setWard] = useState<Stat[]>([]);
  const [amulet, setAmulet] = useState<Stat[]>([]);
  const [ring2, setRing2] = useState<Stat[]>([]);
  const [armor, setArmor] = useState<Stat[]>([]);
  const [spell1, setSpell1] = useState<Stat[]>([]);
  const [spell2, setSpell2] = useState<Stat[]>([]);

  const [isCrit, setIsCrit] = useState<boolean>(true);

  const [metConditions, setMetConditions] = useState<Condition[]>([
    'Everything',
    'Pistol',
    'Spell',
    'Melee',
  ]);

  const [twoSpells, setTwoSpells] = useState(false);

  const allStats = [
    ...ring1,
    ...ward,
    ...amulet,
    ...ring2,
    ...armor,
    ...spell1,
    ...spell2,
  ];

  const allDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'AllDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const allDamage =
    allDamageStats.length > 0
      ? allDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const gunCritDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'CritDamage' &&
        conditions
          .filter(condition => {
            return (
              condition.category === 'Gun' ||
              condition.category === 'Everything'
            );
          })
          .find(condition => condition.id === stat.condition) &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const gunCritDamage =
    gunCritDamageStats.length > 0
      ? gunCritDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const gunDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'GunDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const gunDamage =
    gunDamageStats.length > 0
      ? gunDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const spellDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'SpellDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const spellDamage =
    spellDamageStats.length > 0
      ? spellDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const spellCritDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'CritDamage' &&
        conditions
          .filter(condition => {
            return (
              condition.category === 'Spell' ||
              condition.category === 'Everything'
            );
          })
          .find(condition => condition.id === stat.condition) &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const spellCritDamage =
    spellCritDamageStats.length > 0
      ? spellCritDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const meleeDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'MeleeDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const meleeDamage =
    meleeDamageStats.length > 0
      ? meleeDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const meleeCritDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'CritDamage' &&
        conditions
          .filter(condition => {
            return (
              condition.category === 'Melee' ||
              condition.category === 'Everything'
            );
          })
          .find(condition => condition.id === stat.condition) &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const meleeCritDamage =
    meleeCritDamageStats.length > 0
      ? meleeCritDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const elementalDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'ElementalDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const elementalDamage =
    elementalDamageStats.length > 0
      ? elementalDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const poisonDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'PoisonDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const poisonDamage =
    poisonDamageStats.length > 0
      ? poisonDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const lightningDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'LightningDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const lightningDamage =
    lightningDamageStats.length > 0
      ? lightningDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const fireDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'FireDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const fireDamage =
    fireDamageStats.length > 0
      ? fireDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const frostDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'FrostDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const frostDamage =
    frostDamageStats.length > 0
      ? frostDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  const darkDamageStats = allStats
    .filter(stat => {
      return (
        stat.type === 'DarkDamage' &&
        metConditions.find(condition => {
          return condition === stat.condition;
        })
      );
    })
    .map(stat => {
      return stat.value;
    });
  const darkDamage =
    darkDamageStats.length > 0
      ? darkDamageStats.reduce((prev, curr) => {
          return prev + curr;
        })
      : 0;

  // Gun Damage
  let totalGunDamage = (1 + gunDamage) * (1 + allDamage);
  if (isCrit) totalGunDamage *= 1.5 * (1 + gunCritDamage);
  const totalPoisonGunDamage =
    totalGunDamage * (1 + elementalDamage + poisonDamage);
  const totalLightningGunDamage =
    totalGunDamage * (1 + elementalDamage + lightningDamage);
  const totalFireGunDamage =
    totalGunDamage * (1 + elementalDamage + fireDamage);
  const totalFrostGunDamage =
    totalGunDamage * (1 + elementalDamage + frostDamage);
  const totalDarkGunDamage =
    totalGunDamage * (1 + elementalDamage + darkDamage);

  // Spell Damage
  let totalSpellDamage = (1 + spellDamage) * (1 + allDamage);
  if (isCrit) totalSpellDamage *= 1.5 * (1 + spellCritDamage);
  const totalPoisonSpellDamage =
    totalSpellDamage * (1 + elementalDamage + poisonDamage);
  const totalLightningSpellDamage =
    totalSpellDamage * (1 + elementalDamage + lightningDamage);
  const totalFireSpellDamage =
    totalSpellDamage * (1 + elementalDamage + fireDamage);
  const totalFrostSpellDamage =
    totalSpellDamage * (1 + elementalDamage + frostDamage);
  const totalDarkSpellDamage =
    totalSpellDamage * (1 + elementalDamage + darkDamage);

  // Melee Damage
  let totalMeleeDamage = (1 + meleeDamage) * (1 + allDamage);
  if (isCrit) totalMeleeDamage *= 1.5 * (1 + meleeCritDamage);
  const totalPoisonMeleeDamage =
    totalMeleeDamage * (1 + elementalDamage + poisonDamage);
  const totalLightningMeleeDamage =
    totalMeleeDamage * (1 + elementalDamage + lightningDamage);
  const totalFireMeleeDamage =
    totalMeleeDamage * (1 + elementalDamage + fireDamage);
  const totalFrostMeleeDamage =
    totalMeleeDamage * (1 + elementalDamage + frostDamage);
  const totalDarkMeleeDamage =
    totalMeleeDamage * (1 + elementalDamage + darkDamage);

  return (
    <div className="App px-5">
      <h1>Wonderlands Calculator</h1>
      <div className="row">
        <div className="col-4">
          <h2>First Ring</h2>
          <ItemStats setItem={setRing1} />
        </div>
        <div className="col-4">
          <h2>Ward</h2>
          <ItemStats setItem={setWard} />
        </div>
        <div className="col-4">
          <h2>Amulet</h2>
          <ItemStats setItem={setAmulet} />
        </div>
        <div className="col-4">
          <h2>Second Ring</h2>
          <ItemStats setItem={setRing2} />
        </div>
        <div className="col-4">
          <h2>Armor</h2>
          <ItemStats setItem={setArmor} />
        </div>
        <div className={twoSpells ? 'col-2' : 'col-4'}>
          <div className="d-flex justify-content-center">
            <h2>First Spell</h2>
            {!twoSpells && (
              <div className="ms-3 py-1">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    setTwoSpells(!twoSpells);
                  }}>
                  +
                </button>
              </div>
            )}
          </div>
          <ItemStats setItem={setSpell1} />
        </div>
        {twoSpells && (
          <div className="col-2">
            <div className="d-flex justify-content-center">
              <div>
                <h2>Second Spell</h2>
              </div>
              {twoSpells && (
                <div className="ms-3 py-1">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setTwoSpells(!twoSpells);
                    }}>
                    -
                  </button>
                </div>
              )}
            </div>
            <ItemStats setItem={setSpell2} />
          </div>
        )}
      </div>

      <h2>Conditions</h2>
      <div className="row">
        <div className="col-1 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isCrit}
            onChange={() => setIsCrit(!isCrit)}
          />
          <label className="form-check-label">
            <strong>Critical Hit</strong>
          </label>
        </div>
        <div className="col-2">
          {conditions
            .filter(condition => {
              return condition.category === 'Gun';
            })
            .map(condition => {
              return (
                <div key={condition.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="weaponType"
                    defaultChecked={
                      metConditions.findIndex(metCondi => {
                        return metCondi === condition.id;
                      }) >= 0
                    }
                    onChange={() => {
                      setMetConditions([
                        ...metConditions.filter(metCondi => {
                          return (
                            conditions.find(condiId => {
                              return condiId.id === metCondi;
                            })?.category !== 'Gun'
                          );
                        }),
                        condition.id,
                      ]);
                    }}
                  />
                  <label className="form-check-label">{condition.name}</label>
                </div>
              );
            })}
        </div>
      </div>

      <h2>Damage Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Non-Elemental</th>
            <th>Poison</th>
            <th>Lightning</th>
            <th>Fire</th>
            <th>Frost</th>
            <th>Dark Magic</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Gun Damage</strong>
            </td>
            <td>{(totalGunDamage * 100).toFixed(2)}%</td>
            <td>{(totalPoisonGunDamage * 100).toFixed(2)}%</td>
            <td>{(totalLightningGunDamage * 100).toFixed(2)}%</td>
            <td>{(totalFireGunDamage * 100).toFixed(2)}%</td>
            <td>{(totalFrostGunDamage * 100).toFixed(2)}%</td>
            <td>{(totalDarkGunDamage * 100).toFixed(2)}%</td>
          </tr>
          <tr>
            <td>
              <strong>Spell Damage</strong>
            </td>
            <td>{(totalSpellDamage * 100).toFixed(2)}%</td>
            <td>{(totalPoisonSpellDamage * 100).toFixed(2)}%</td>
            <td>{(totalLightningSpellDamage * 100).toFixed(2)}%</td>
            <td>{(totalFireSpellDamage * 100).toFixed(2)}%</td>
            <td>{(totalFrostSpellDamage * 100).toFixed(2)}%</td>
            <td>{(totalDarkSpellDamage * 100).toFixed(2)}%</td>
          </tr>
          <tr>
            <td>
              <strong>Melee Damage</strong>
            </td>
            <td>{(totalMeleeDamage * 100).toFixed(2)}%</td>
            <td>{(totalPoisonMeleeDamage * 100).toFixed(2)}%</td>
            <td>{(totalLightningMeleeDamage * 100).toFixed(2)}%</td>
            <td>{(totalFireMeleeDamage * 100).toFixed(2)}%</td>
            <td>{(totalFrostMeleeDamage * 100).toFixed(2)}%</td>
            <td>{(totalDarkMeleeDamage * 100).toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
