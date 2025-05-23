/**
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */
import { AlertCircle, Camera, Loader2 } from 'lucide-react';
import { Button } from '@renderer/components/ui/button';
import { GUIAgentError, ErrorStatusEnum } from '@ui-tars/shared/types';

export const HumanTextMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-2 mb-4 mt-8 items-center">
      <div className="ml-auto p-3 rounded-md bg-secondary">{text}</div>
    </div>
  );
};

interface ScreenshotMessageProps {
  onClick?: () => void;
}

export const ScreenshotMessage = ({ onClick }: ScreenshotMessageProps) => {
  return (
    <Button variant="outline" className="rounded-full" onClick={onClick}>
      <Camera className="w-4 h-4" />
      <span>Screenshot</span>
    </Button>
  );
};

export const ErrorMessage = ({ text }: { text: string }) => {
  let parsedError: GUIAgentError | null = null;
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object' && 'status' in parsed) {
      parsedError = parsed as GUIAgentError;
    }
  } catch {
    // ignore
  }

  return (
    <div className="flex flex-col gap-2 my-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
        <span className="font-medium text-red-500">
          {parsedError
            ? ErrorStatusEnum[parsedError.status] || 'UNKNOWN_ERROR'
            : 'Error'}
        </span>
      </div>
      {parsedError ? (
        <div className="flex flex-col gap-1">
          <div className="text-sm text-red-500/90 font-medium">
            {parsedError.message}
          </div>
          {parsedError.stack && (
            <div className="text-xs text-red-500/70 font-mono mt-2">
              {parsedError.stack}
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-red-500/90 break-all">{text}</div>
      )}
    </div>
  );
};

export const LoadingText = ({ text }: { text: string }) => {
  return (
    <div className="mt-4">
      <div className="inline-flex items-center gap-2 text-muted-foreground animate-pulse">
        <Loader2 className="h-4 w-4 animate-spin" />
        {text}
      </div>
    </div>
  );
};
