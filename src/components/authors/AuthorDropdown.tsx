'use client';

import { useEffect, useState } from 'react';
import { createListCollection } from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { authorService } from '@/services/authorService';
import { Author } from '@/types/types';

interface AuthorsSelectProps {
  onSelect: (authorId: number) => void;
}

export default function AuthorSelect({ onSelect }: AuthorsSelectProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAuthors() {
      const data = await authorService.getAll();
      setAuthors(data);
    }
    fetchAuthors();
  }, []);

  const list = createListCollection({
    items: authors.map((author) => ({
      label: author.name,
      value: String(author.id),
    })),
  });

  const handleSelect = (details: { value: string[] }) => {
    const selectedId = details.value[0];
    setSelectedAuthor([selectedId]);
    onSelect(Number(selectedId));
  };

  return (
    <SelectRoot
      value={selectedAuthor}
      onValueChange={handleSelect}
      collection={list}
    >
      <SelectTrigger>
        <SelectValueText placeholder='Select n author' />
      </SelectTrigger>
      <SelectContent>
        {list.items.map((author) => (
          <SelectItem key={author.value} item={author}>
            {author.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
