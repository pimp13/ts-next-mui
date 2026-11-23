"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import type {
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridRowId,
  GridRowModel,
  GridRowModesModel,
  GridSlotProps,
  GridSlots,
} from "@mui/x-data-grid";
import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  Toolbar,
  ToolbarButton,
  gridEditRowsStateSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

type ArticleStatus = "draft" | "published" | "archived";

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: ArticleStatus;
  published_at: Date | null;
  author_name: string;
  view_count: number;
  created_at: Date | null;
  isNew?: boolean;
};

type CreateArticlePayload = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: ArticleStatus;
  published_at: string | null;
};

type UpdateArticlePayload = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: ArticleStatus;
  published_at: string | null;
};

type DeleteArticlePayload = {
  id: string;
};

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: ArticleRow[]) => ArticleRow[]) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

function toDate(value: unknown): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function toIso(value: Date | null | undefined): string | null {
  if (!value) return null;
  return value.toISOString();
}

/** Builds create payload — wire to POST /api/articles/create later. */
function prepareCreateArticlePayload(row: ArticleRow): CreateArticlePayload {
  return {
    title: row.title.trim(),
    slug: row.slug.trim(),
    excerpt: row.excerpt.trim(),
    content: row.content.trim() || row.excerpt.trim() || row.title.trim(),
    cover_image: row.cover_image.trim(),
    status: row.status || "draft",
    published_at: toIso(row.published_at),
  };
}

/** Builds update payload — wire to PUT /api/articles/:id later. */
function prepareUpdateArticlePayload(row: ArticleRow): UpdateArticlePayload {
  return {
    id: String(row.id),
    title: row.title.trim(),
    slug: row.slug.trim(),
    excerpt: row.excerpt.trim(),
    content: row.content.trim() || row.excerpt.trim() || row.title.trim(),
    cover_image: row.cover_image.trim(),
    status: row.status || "draft",
    published_at: toIso(row.published_at),
  };
}

/** Builds delete payload — wire to DELETE /api/articles/:id later. */
function prepareDeleteArticlePayload(id: GridRowId): DeleteArticlePayload {
  return { id: String(id) };
}

async function submitCreateArticle(payload: CreateArticlePayload) {
  // TODO: POST http://localhost:8080/api/articles/create
  console.log("[articles] create payload", payload);
}

async function submitUpdateArticle(payload: UpdateArticlePayload) {
  // TODO: PUT http://localhost:8080/api/articles/:id
  console.log("[articles] update payload", payload);
}

async function submitDeleteArticle(payload: DeleteArticlePayload) {
  // TODO: DELETE http://localhost:8080/api/articles/:id
  console.log("[articles] delete payload", payload);
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = crypto.randomUUID();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        cover_image: "",
        status: "draft",
        published_at: null,
        author_name: "",
        view_count: 0,
        created_at: new Date(),
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
    }));
  };

  return (
    <Toolbar>
      <Tooltip title="Add article">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

interface ActionHandlers {
  handleCancelClick: (id: GridRowId) => void;
  handleDeleteClick: (id: GridRowId) => void;
  handleEditClick: (id: GridRowId) => void;
  handleSaveClick: (id: GridRowId) => void;
}

const ActionHandlersContext = React.createContext<ActionHandlers>({
  handleCancelClick: () => { },
  handleDeleteClick: () => { },
  handleEditClick: () => { },
  handleSaveClick: () => { },
});

function ActionsCell(props: GridRenderCellParams) {
  const apiRef = useGridApiContext();
  const rowModesModel = useGridSelector(apiRef, gridEditRowsStateSelector);
  const isInEditMode = typeof rowModesModel[props.id] !== "undefined";

  const {
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick,
  } = React.useContext(ActionHandlersContext);

  return (
    <GridActionsCell {...props}>
      {isInEditMode ? (
        <React.Fragment>
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            material={{ sx: { color: "primary.main" } }}
            onClick={() => handleSaveClick(props.id)}
          />
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={() => handleCancelClick(props.id)}
            color="inherit"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(props.id)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(props.id)}
            color="inherit"
          />
        </React.Fragment>
      )}
    </GridActionsCell>
  );
}

const columns: GridColDef<ArticleRow>[] = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
    editable: true,
    flex: 1,
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 180,
    editable: true,
  },
  {
    field: "excerpt",
    headerName: "Excerpt",
    width: 220,
    editable: true,
  },
  {
    field: "cover_image",
    headerName: "Cover Image",
    width: 160,
    editable: true,
    renderCell: (params) => {
      if (!params.value) return null;
      return (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={String(params.value)}
            alt={params.row.title || "Cover"}
            width={72}
            height={48}
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
        </Box>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    editable: true,
    type: "singleSelect",
    valueOptions: ["draft", "published", "archived"],
  },
  {
    field: "published_at",
    headerName: "Published At",
    width: 140,
    editable: true,
    type: "date",
    valueGetter: (_value, row) => toDate(row.published_at),
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 130,
    type: "date",
    editable: false,
    valueGetter: (_value, row) => toDate(row.created_at),
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    renderCell: (params) => <ActionsCell {...params} />,
  },
];

export default function UsersDataGrid() {
  const [rows, setRows] = React.useState<ArticleRow[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    fetch("http://localhost:8080/api/public/articles")
      .then((response) => response.json())
      .then((payload) => {
        if (cancelled) return;
        const list = (payload?.result?.data ?? []) as Array<
          Record<string, unknown>
        >;
        setRows(
          list.map((item) => ({
            id: String(item.id),
            title: String(item.title ?? ""),
            slug: String(item.slug ?? ""),
            excerpt: String(item.excerpt ?? ""),
            content: String(item.content ?? ""),
            cover_image: String(item.cover_image ?? ""),
            status: (item.status as ArticleStatus) || "published",
            published_at: toDate(item.published_at),
            author_name: String(item.author_name ?? ""),
            view_count: Number(item.view_count ?? 0),
            created_at: toDate(item.created_at),
            isNew: false,
          })),
        );
      })
      .catch((error) => console.error("Error fetching articles:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const actionHandlers = React.useMemo<ActionHandlers>(
    () => ({
      handleEditClick: (id: GridRowId) => {
        setRowModesModel((prev) => ({
          ...prev,
          [id]: { mode: GridRowModes.Edit },
        }));
      },
      handleSaveClick: (id: GridRowId) => {
        setRowModesModel((prev) => ({
          ...prev,
          [id]: { mode: GridRowModes.View },
        }));
      },
      handleDeleteClick: (id: GridRowId) => {
        void submitDeleteArticle(prepareDeleteArticlePayload(id));
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      },
      handleCancelClick: (id: GridRowId) => {
        setRowModesModel((prev) => ({
          ...prev,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }));

        setRows((prevRows) => {
          const editedRow = prevRows.find((row) => row.id === id) as
            | ArticleRow
            | undefined;
          if (editedRow?.isNew) {
            return prevRows.filter((row) => row.id !== id);
          }
          return prevRows;
        });
      },
    }),
    [],
  );

  const processRowUpdate = async (newRow: GridRowModel) => {
    const article = {
      ...(newRow as ArticleRow),
      published_at: toDate(newRow.published_at),
      created_at: toDate(newRow.created_at),
      isNew: false,
    } satisfies ArticleRow;

    if ((newRow as ArticleRow).isNew) {
      const payload = prepareCreateArticlePayload(article);
      await submitCreateArticle(payload);
    } else {
      const payload = prepareUpdateArticlePayload(article);
      await submitUpdateArticle(payload);
    }

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === article.id ? article : row)),
    );
    return article;
  };

  return (
    <Box
      sx={{
        height: 560,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <ActionHandlersContext.Provider value={actionHandlers}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={setRowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          showToolbar
          slots={{ toolbar: EditToolbar as GridSlots["toolbar"] }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </ActionHandlersContext.Provider>
    </Box>
  );
}
