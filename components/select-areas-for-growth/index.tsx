import React from 'react';
import Link from 'next/link';
import {useSession} from "next-auth/client";
import {useState, useEffect} from 'react';
import {useGrowthAreas, useName} from '@/lib/swr-hooks'
import {withRouter} from 'next/router';

function SelectAreasForGrowth(user_id) {
    const [session] = useSession();
    const userEmail = session?.user?.email;
    let receiveEmail = user_id.user_id;
    const name = useName(receiveEmail);

    let areas_for_growth = [["Adaptability", "adaptability", 0], ["Attention to Detail", "attention_to_detail", 0], ["Business Acumen", "business_acumen", 0], ["Confidence", "confidence", 0],
        ["Conflict Resolution", "conflict_resolution", 0], ["Decision Making", "decision_making", 0], ["Dependability", "dependability", 0], ["Domain Knowledge", "domain_knowledge", 0],
        ["Emotional Intelligence", "emotional_intelligence", 0], ["Growth Mindset", "growth_mindset", 0], ["Leadership", "leadership", 0],
        ["Listening", "listening", 0], ["Multitasking", "multitasking", 0], ["Open Mindedness", "open_mindedness", 0], ["Organization", "organization", 0], ["Problem Solving", "problem_solving", 0],
        ["Self-care", "self_care", 0], ["Self-motivation", "self_motivation", 0], ["Teamwork", "teamwork", 0], ["Time Management", "time_management", 0],
        ["Verbal Communication", "verbal_communication", 0], ["Work Ethic", "work_ethic", 0], ["Working Under Pressure", "working_under_pressure", 0],
        ["Written Communication", "written_communication", 0]];

    const { growth_areas: growth_areas, isError }  = useGrowthAreas(user_id.user_id, userEmail);
    const [areas, setAreas] = useState(undefined);
    let initialChecked = Array.apply(null, Array(areas_for_growth.length)).map(Number.prototype.valueOf,0);
    const [checkedState, setCheckedState] = useState(
        new Array(initialChecked.length).fill(false)
    );

    useEffect(() => {
        if (growth_areas !== undefined && growth_areas.length != 0) {
            Object.entries(growth_areas[0]).forEach(([key, value], i) => {
                areas_for_growth[i][2] = growth_areas[0][key];
                checkedState[i] = growth_areas[0][key] == 1;
            });

            setCheckedState(checkedState)
            setAreas(areas_for_growth);
        } else {
            setAreas(areas_for_growth);
        }
    }, [growth_areas]);


    const handleOnChange = (i, binary) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === i ? !item : item
        );

        setCheckedState(updatedCheckedState);
        areas[i][2] = binary ? 0 : 1;
        setAreas(areas);
        window.localStorage.setItem('areas', JSON.stringify(areas));
        window.localStorage.setItem('checked', JSON.stringify(checkedState));
        submitHandler(areas);
    }

    async function submitHandler(areas) {
        let [adaptability, attention_to_detail, business_acumen, confidence, conflict_resolution,
            decision_making, dependability, domain_knowledge, emotional_intelligence, growth_mindset,
            leadership, organization, listening, multitasking, open_mindedness, problem_solving,
            self_care, self_motivation, teamwork, time_management, verbal_communication, work_ethic,
            working_under_pressure, written_communication] = areas.map((item) => item[2])

        let userIdCombo = userEmail + receiveEmail

        try {
            const res = await fetch('/api/add-aog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    adaptability, attention_to_detail, business_acumen, confidence, conflict_resolution,
                    decision_making, dependability, domain_knowledge, emotional_intelligence, growth_mindset,
                    leadership, organization, listening, multitasking, open_mindedness, problem_solving,
                    self_care, self_motivation, teamwork, time_management, verbal_communication, work_ethic,
                    working_under_pressure, written_communication, userEmail, receiveEmail, userIdCombo
                }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
        } catch (e) {
            throw Error(e.message)
        }
    }

    return (
        <div className="w-full pt-4.5rem">
            <div className="flex flex-col">
                <h3 className="text-3xl text-customGrey2 font-bold">Areas For Growth</h3>
                <h3 className="text-base text-customGrey2 mt-1 mb-6">Select areas that you think {name.name[0].first_name} could improve on</h3>
                {areas !== undefined ?
                    (areas.map((a, index) => (
                        <div>
                            <div className="w-full pt-2 flex flex-row justify-start items-center">
                                <input
                                    id="first_name"
                                    type="checkbox"
                                    className="border-b border-black pl-2"
                                    name="ju"
                                    checked={checkedState[index]}
                                    onChange={() => handleOnChange(index, checkedState[index])}
                                >
                                </input>
                                <h3 className="pl-2">{a[0]}</h3>
                            </div>
                        </div>

                        ))
                    ) : (areas_for_growth.map((a, index) => (
                            <div>
                                <div className="w-full pt-2 flex flex-row justify-start items-center">
                                    <input
                                        id="first_name"
                                        type="checkbox"
                                        className="border-b border-black pl-2"
                                        name="ju"
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index, checkedState[index])}
                                    >
                                    </input>
                                    <h3 className="pl-2">{a[0]}</h3>
                                </div>
                            </div>
                        ))
                    )


                }
            </div>
        </div>
    )
    // } else {
    //     return (
    //         <>
    //         </>
    //     )
    // }

}

export default SelectAreasForGrowth