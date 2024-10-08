import React, { useState, useCallback, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useGlobalVariables } from "../../../Store/AppContext";

function TagModal({ setTagModal, tagModal, projectId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const [initTagString, setInitTagString] = useState('');
    const [resultTagString, setResultTagString] = useState('');
    console.log('resultTagString', resultTagString)
    console.log('initTagString', initTagString)

    const [tags, setTags] = useState([]);

    const [caseTags, setCaseTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleCheckTag = (tagId) => {
        const updatedTags = tags.map(tag => {
            if (tag.id === tagId) {
                return { ...tag, checked: !tag.checked };
            }
            return tag;
        });
        setTags(updatedTags);
        setResultTagString(convertArray2Str(updatedTags.filter(tag => tag.checked).map(tag => tag.id)));
    }

    const convertStr2Array = (str) => {
        if (!str) {
            return [];
        }
        return str.split(',').map(item => item.trim());
    }
    const convertArray2Str = (arr) => {
        if (!arr) {
            return '';
        }
        return arr.join(',');
    }

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-tags/" + projectId);
                const data = await response.json();
                const caseTagIds = new Set(convertStr2Array(tagModal.tags));
                console.log('caseTagIds', caseTagIds)

                const updatedTags = data.map(tag => ({
                    ...tag,
                    checked: caseTagIds.has(tag.id.toString())
                }));
                setInitTagString(tagModal.tags);
                setResultTagString(tagModal.tags);
                setTags(updatedTags);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchTag();
    }, [])

    // const urlWEB = process.env.REACT_APP_WEB_URL;

    const handleCancel = () => {
        setTagModal({
            showModal: false
        })
    }

    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-1/3 w-full my-6 mx-auto max-w-3xl p-4">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                            <div className="text-lg font-semibold select-none">
                                Tags
                            </div>
                        </div>
                        {/*body*/}
                        <div className="relative text-left text-sm">
                            <div className="font-medium text-lg px-3 py-2 border-b">
                                {tagModal.caseTitle}
                            </div>
                            <div className="h-[400px]">
                                <div className="flex flex-wrap px-3 py-6 gap-2 ">
                                    {tags.map((tag) => (
                                        <span key={tag.id}
                                            className={`px-2 py-1 border rounded-xl select-none cursor-pointer ${tag.checked ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                            onClick={() => handleCheckTag(tag.id)}

                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>


                        </div>
                        {/*footer*/}
                        <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5] text-sm">
                            <BtnCancel onClick={() => setTagModal({
                                showModal: false
                            })} />

                            {initTagString === resultTagString ?

                                <BtnOKDisabled />
                                :
                                <BtnOK />

                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black overflow-hidden"></div>


        </div>

    )


}

export default TagModal;