import Button from "./Button";

interface ConfirmDeleteModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * ConfirmDeleteModal is a reusable component that shows a confirmation dialog when the user attempts to delete something.
 */
function ConfirmDeleteModal({
  message,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl p-8 w-full max-w-sm text-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm delete"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm delete"
          className="text-lg font-bold text-text-primary mb-2"
        >
          Are you sure?
        </h2>
        <p className="text-text-muted text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1 bg-bg-primary hover:bg-bg-primary-hover"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
