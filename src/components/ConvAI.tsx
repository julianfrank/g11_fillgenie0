"use client";

import { useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
// import { Orb } from "./ui/orb";


async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
    } catch {
        console.error("Microphone permission denied");
        return false;
    }
}

// async function getSignedUrl(): Promise<string> {
//     const response = await fetch("/api/signed-url");
//     if (!response.ok) {
//         throw Error("Failed to get signed url");
//     }
//     const data = await response.json();
//     return data.signedUrl;
// }

export function ConvAI() {
    const conversation = useConversation({
        onConnect: () => {
            console.log("connected");
        },
        onDisconnect: () => {
            console.log("disconnected");
        },
        onError: error => {
            console.log(error);
            alert("An error occurred during the conversation");
        },
        onMessage: message => {
            console.log(message);
        }
    });

    async function startConversation() {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            alert("No permission");
            return;
        }
        // const signedUrl = await getSignedUrl();
        // const conversationId = await conversation.startSession({
        //     signedUrl
        // });
        const conversationId = await conversation.startSession({
            agentId: "agent_0801kd0a8dfyeyk90e4c3v71bqr6",
            connectionType: "webrtc"
        });
        console.log(conversationId);
    }


    const stopConversation = useCallback(async () => {
        await conversation.endSession();
    }, [conversation]);


    // function getAgentState() {
    //     if (conversation.status === "connected" && conversation.isSpeaking) {
    //         return "talking";
    //     }
    //     if (conversation.status === "connected") {
    //         return "listening";
    //     }
    //     if (conversation.status === "disconnected") {
    //         return null;
    //     }
    //     return null;
    // }

    return (
        <div className={"flex justify-center items-center gap-x-10"}>
            {/* <Orb agentState={getAgentState()} className={"w-[64px] h-[64px]"} /> */}
            <div>
                {conversation.status === "connected"
                    ? conversation.isSpeaking
                        ? `Agent is speaking`
                        : "Agent is listening"
                    : "Disconnected"}

                <div className={"flex flex-col gap-y-4 text-center items-center"}>


                    <button

                        className={"rounded-full"}

                        disabled={
                            conversation.status !== "disconnected"
                        }
                        onClick={startConversation}
                    >
                        Get Help
                    </button>
                    <button

                        className={"rounded-full"}

                        disabled={conversation.status === "disconnected"}
                        onClick={stopConversation}
                    >
                        Stop Help
                    </button>
                </div>
            </div>
        </div>
    );
}