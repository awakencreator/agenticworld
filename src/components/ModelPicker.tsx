import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { LLMModel, LLMModelConfig } from '@/types/llmModel'

export function ModelPicker({
    models,
    languageModel,
    onLanguageModelChange,
}: {
    models: LLMModel[]
    languageModel: LLMModelConfig
    onLanguageModelChange: (config: LLMModelConfig) => void
}) {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex flex-col">
                <Select
                    name="languageModel"
                    defaultValue={languageModel.model}
                    onValueChange={(e) => onLanguageModelChange({ model: e })}
                >
                    <SelectTrigger
                        className="whitespace-nowrap border-none shadow-none focus:ring-0 px-0 py-0 h-6 text-xs">
                        <SelectValue placeholder="Language model" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(
                            Object.groupBy(models, ({ provider }) => provider),
                        ).map(([provider, models]) => (
                            <SelectGroup key={provider}>
                                <SelectLabel>{provider}</SelectLabel>
                                {models?.map((model) => (
                                    <SelectItem key={model.id} value={model.id}>
                                        <div className="flex items-center space-x-2">
                                            <img
                                                className="flex"
                                                src={new URL(`../assets/thirdparty/logos/${model.providerId}.svg`, import.meta.url).href}
                                                alt={model.provider}
                                                width={14}
                                                height={14}
                                            />
                                            <span>{model.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
