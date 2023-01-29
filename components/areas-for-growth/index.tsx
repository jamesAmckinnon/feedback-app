import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useGrowthAreas, useName} from '@/lib/swr-hooks';
import {useSession} from "next-auth/client";
import {useGrowthAreasProfile} from '@/lib/swr-hooks'

function AreasForGrowth( ) {
    // @ts-ignore
    const [session] = useSession();
    const userEmail = session?.user?.email;
    const { growth_areas: growth_areas, isLoading: isLoading, isError: isError }  = useGrowthAreasProfile(userEmail);
    const [areas, setAreas] = useState(undefined);
    let areas_for_growth = [["Adaptability", "adaptability", 0], ["Attention to Detail", "attention_to_detail", 0], ["Business Acumen", "business_acumen", 0], ["Confidence", "confidence", 0],
        ["Conflict Resolution", "conflict_resolution", 0], ["Decision Making", "decision_making", 0], ["Dependability", "dependability", 0], ["Domain Knowledge", "domain_knowledge", 0],
        ["Emotional Intelligence", "emotional_intelligence", 0], ["Growth Mindset", "growth_mindset", 0], ["Leadership", "leadership", 0],
        ["Listening", "listening", 0], ["Multitasking", "multitasking", 0], ["Open Mindedness", "open_mindedness", 0], ["Organization", "organization", 0], ["Problem Solving", "problem_solving", 0],
        ["Self-care", "self_care", 0], ["Self-motivation", "self_motivation", 0], ["Teamwork", "teamwork", 0], ["Time Management", "time_management", 0],
        ["Verbal Communication", "verbal_communication", 0], ["Work Ethic", "work_ethic", 0], ["Working Under Pressure", "working_under_pressure", 0],
        ["Written Communication", "written_communication", 0]];

    useEffect(() => {
        if (growth_areas !== undefined && growth_areas.length != 0) {
            for (let i = 0; i < growth_areas.length; i++) {
                for (let j = 0; j < Object.keys(growth_areas[i]).length; j++) {
                    let currentKey = Object.keys(growth_areas[i])[j]
                    areas_for_growth[j][2] += growth_areas[i][currentKey]
                }
            }
            setAreas(areas_for_growth);
        } else {
            setAreas(areas_for_growth);
        }
    }, [growth_areas]);

    return (
        <div className="w-full pt-4.5rem">
            <div className="flex flex-col">
                <h3 className="text-3xl mb-2 text-customGrey2 font-bold">Areas For Growth</h3>
                {areas !== undefined ?
                    (areas.map((a, index) => (
                        <div>
                            <div className="w-full pt-2 flex flex-row justify-start items-center">
                                <h3 className="">{a[0]}:</h3>
                                <h3 className="pl-2"> {a[2]}</h3>
                            </div>
                        </div>

                        ))
                    ) : (areas_for_growth.map((a, index) => (
                            <div>
                                <div className="w-full pt-2 flex flex-row justify-start items-center">
                                    <h3 className="pl-2">{a[0]}:</h3>
                                    <h3 className="pl-2"> {a[2]}</h3>
                                </div>
                            </div>
                        ))
                    )


                }
            </div>
        </div>
    )
}

export default AreasForGrowth